-- FleetFlow PostgreSQL schema
-- Run as a superuser or a role that can create extensions

-- Extensions
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 1) ENUM TYPES
CREATE TYPE user_role AS ENUM (
  'Manager',
  'Dispatcher',
  'Safety',
  'Finance'
);

CREATE TYPE vehicle_status AS ENUM (
  'Available',
  'OnTrip',
  'InShop',
  'Retired'
);

CREATE TYPE driver_status AS ENUM (
  'Available',
  'OnTrip',
  'OffDuty',
  'Suspended'
);

CREATE TYPE trip_status AS ENUM (
  'Draft',
  'Dispatched',
  'Completed',
  'Cancelled'
);

-- 2) USERS
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role user_role NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- 3) VEHICLES
CREATE TABLE IF NOT EXISTS vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  license_plate TEXT UNIQUE NOT NULL,
  max_capacity INTEGER NOT NULL CHECK (max_capacity > 0),
  odometer INTEGER DEFAULT 0 CHECK (odometer >= 0),
  acquisition_cost NUMERIC(12,2),
  status vehicle_status DEFAULT 'Available',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_vehicle_status ON vehicles(status);

-- 4) DRIVERS
CREATE TABLE IF NOT EXISTS drivers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  license_number TEXT UNIQUE NOT NULL,
  license_category TEXT NOT NULL,
  license_expiry DATE NOT NULL,
  safety_score NUMERIC(5,2) DEFAULT 100,
  status driver_status DEFAULT 'Available',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_driver_status ON drivers(status);

-- 5) TRIPS
CREATE TABLE IF NOT EXISTS trips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE RESTRICT,
  driver_id UUID NOT NULL REFERENCES drivers(id) ON DELETE RESTRICT,
  cargo_weight INTEGER NOT NULL CHECK (cargo_weight > 0),
  origin TEXT NOT NULL,
  destination TEXT NOT NULL,
  status trip_status DEFAULT 'Draft',
  start_odometer INTEGER,
  end_odometer INTEGER,
  revenue NUMERIC(12,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_trip_vehicle ON trips(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_trip_driver ON trips(driver_id);
CREATE INDEX IF NOT EXISTS idx_trip_status ON trips(status);

-- 6) MAINTENANCE LOGS
CREATE TABLE IF NOT EXISTS maintenance_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  cost NUMERIC(12,2) NOT NULL CHECK (cost >= 0),
  service_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_maintenance_vehicle ON maintenance_logs(vehicle_id);

-- 7) FUEL LOGS
CREATE TABLE IF NOT EXISTS fuel_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  trip_id UUID REFERENCES trips(id) ON DELETE SET NULL,
  liters NUMERIC(8,2) NOT NULL CHECK (liters > 0),
  cost NUMERIC(12,2) NOT NULL CHECK (cost >= 0),
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_fuel_vehicle ON fuel_logs(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_fuel_trip ON fuel_logs(trip_id);

-- 8) VIEW: Operational Cost per Vehicle (use sub-aggregates to avoid double-counting)
CREATE OR REPLACE VIEW vehicle_operational_cost AS
SELECT
  v.id AS vehicle_id,
  COALESCE(f.fuel_cost, 0) AS fuel_cost,
  COALESCE(m.maintenance_cost, 0) AS maintenance_cost,
  COALESCE(f.fuel_cost, 0) + COALESCE(m.maintenance_cost, 0) AS total_cost
FROM vehicles v
LEFT JOIN (
  SELECT vehicle_id, SUM(cost) AS fuel_cost
  FROM fuel_logs
  GROUP BY vehicle_id
) f ON v.id = f.vehicle_id
LEFT JOIN (
  SELECT vehicle_id, SUM(cost) AS maintenance_cost
  FROM maintenance_logs
  GROUP BY vehicle_id
) m ON v.id = m.vehicle_id;

-- 9) VIEW: Fuel Efficiency per Trip
CREATE OR REPLACE VIEW trip_fuel_efficiency AS
SELECT
  t.id AS trip_id,
  (t.end_odometer - t.start_odometer) / NULLIF(fl.total_liters, 0) AS km_per_liter
FROM trips t
LEFT JOIN (
  SELECT trip_id, SUM(liters) AS total_liters
  FROM fuel_logs
  GROUP BY trip_id
) fl ON t.id = fl.trip_id
WHERE t.status = 'Completed';

-- 10) Trigger: Auto Set Vehicle to InShop after maintenance insert
CREATE OR REPLACE FUNCTION set_vehicle_inshop()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE vehicles
  SET status = 'InShop'
  WHERE id = NEW.vehicle_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_vehicle_inshop ON maintenance_logs;
CREATE TRIGGER trg_vehicle_inshop
AFTER INSERT ON maintenance_logs
FOR EACH ROW
EXECUTE FUNCTION set_vehicle_inshop();

-- Additional safety: prevent retiring vehicle when OnTrip via constraint function
CREATE OR REPLACE FUNCTION prevent_retire_if_ontrip()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'Retired' THEN
    PERFORM 1 FROM vehicles v WHERE v.id = NEW.id AND v.status = 'OnTrip';
    IF FOUND THEN
      RAISE EXCEPTION 'Cannot retire vehicle while it is OnTrip';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_prevent_retire ON vehicles;
CREATE TRIGGER trg_prevent_retire
BEFORE UPDATE ON vehicles
FOR EACH ROW
WHEN (NEW.status = 'Retired')
EXECUTE FUNCTION prevent_retire_if_ontrip();


-- Ready

-- Example usage note (run as psql):
-- psql -h localhost -U postgres -d fleetflow -f db/schema.sql

-- Seed data for FleetFlow (assumes schema from db/schema.sql already applied)
-- Ensure pgcrypto exists
CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO $$
DECLARE
  u_manager UUID;
  u_dispatcher UUID;
  v_a1 UUID; v_a2 UUID; v_a3 UUID; v_inshop UUID; v_ontrip UUID;
  d_a1 UUID; d_a2 UUID; d_suspended UUID; d_ontrip UUID;
  trip_completed UUID; trip_dispatched UUID;
BEGIN
  -- Users
  -- Insert users idempotently (unique on email)
  INSERT INTO users(id,name,email,password_hash,role)
    VALUES (gen_random_uuid(),'Alice Manager','alice@fleet.local','seed_hash','Manager')
    ON CONFLICT (email) DO NOTHING;
  SELECT id INTO u_manager FROM users WHERE email = 'alice@fleet.local';

  INSERT INTO users(id,name,email,password_hash,role)
    VALUES (gen_random_uuid(),'Bob Dispatcher','bob@fleet.local','seed_hash','Dispatcher')
    ON CONFLICT (email) DO NOTHING;
  SELECT id INTO u_dispatcher FROM users WHERE email = 'bob@fleet.local';

  -- Vehicles: 3 Available
  -- Vehicles (idempotent on license_plate)
  INSERT INTO vehicles(id,name,license_plate,max_capacity,odometer,acquisition_cost,status)
    VALUES (gen_random_uuid(),'Truck A','AAA-111',1000,10000,50000,'Available') ON CONFLICT (license_plate) DO NOTHING;
  SELECT id INTO v_a1 FROM vehicles WHERE license_plate = 'AAA-111';

  INSERT INTO vehicles(id,name,license_plate,max_capacity,odometer,acquisition_cost,status)
    VALUES (gen_random_uuid(),'Truck B','BBB-222',800,5000,40000,'Available') ON CONFLICT (license_plate) DO NOTHING;
  SELECT id INTO v_a2 FROM vehicles WHERE license_plate = 'BBB-222';

  INSERT INTO vehicles(id,name,license_plate,max_capacity,odometer,acquisition_cost,status)
    VALUES (gen_random_uuid(),'Van C','CCC-333',500,2500,20000,'Available') ON CONFLICT (license_plate) DO NOTHING;
  SELECT id INTO v_a3 FROM vehicles WHERE license_plate = 'CCC-333';

  -- 1 InShop (will be set by maintenance trigger)
  INSERT INTO vehicles(id,name,license_plate,max_capacity,odometer,acquisition_cost,status)
    VALUES (gen_random_uuid(),'Service Truck','SERV-001',1200,8000,60000,'Available') ON CONFLICT (license_plate) DO NOTHING;
  SELECT id INTO v_inshop FROM vehicles WHERE license_plate = 'SERV-001';

  -- 1 OnTrip (will be associated with a dispatched trip)
  INSERT INTO vehicles(id,name,license_plate,max_capacity,odometer,acquisition_cost,status)
    VALUES (gen_random_uuid(),'Long Hauler','LONG-01',2000,150000,120000,'Available') ON CONFLICT (license_plate) DO NOTHING;
  SELECT id INTO v_ontrip FROM vehicles WHERE license_plate = 'LONG-01';

  -- Drivers
  -- Drivers (idempotent on license_number)
  INSERT INTO drivers(id,name,license_number,license_category,license_expiry,safety_score,status)
    VALUES (gen_random_uuid(),'Daniel Driver','D-1001','C', (CURRENT_DATE + INTERVAL '365 days')::date, 98.5, 'Available') ON CONFLICT (license_number) DO NOTHING;
  SELECT id INTO d_a1 FROM drivers WHERE license_number = 'D-1001';

  INSERT INTO drivers(id,name,license_number,license_category,license_expiry,safety_score,status)
    VALUES (gen_random_uuid(),'Eve Driver','E-1002','B', (CURRENT_DATE + INTERVAL '180 days')::date, 95.0, 'Available') ON CONFLICT (license_number) DO NOTHING;
  SELECT id INTO d_a2 FROM drivers WHERE license_number = 'E-1002';

  -- Suspended
  INSERT INTO drivers(id,name,license_number,license_category,license_expiry,safety_score,status)
    VALUES (gen_random_uuid(),'Frank Suspended','F-9000','C', (CURRENT_DATE + INTERVAL '30 days')::date, 60.0, 'Suspended') ON CONFLICT (license_number) DO NOTHING;
  SELECT id INTO d_suspended FROM drivers WHERE license_number = 'F-9000';

  -- OnTrip driver (will be linked to dispatched trip)
  INSERT INTO drivers(id,name,license_number,license_category,license_expiry,safety_score,status)
    VALUES (gen_random_uuid(),'Grace OnTrip','G-7000','C', (CURRENT_DATE + INTERVAL '365 days')::date, 99.0, 'Available') ON CONFLICT (license_number) DO NOTHING;
  SELECT id INTO d_ontrip FROM drivers WHERE license_number = 'G-7000';

  -- Trips
  -- Completed trip using v_a2 and d_a2
  -- Completed trip using v_a2 and d_a2
  INSERT INTO trips(id,vehicle_id,driver_id,cargo_weight,origin,destination,status,start_odometer,end_odometer,revenue)
    VALUES (gen_random_uuid(), v_a2, d_a2, 400, 'Warehouse X', 'Client Y', 'Completed', 4800, 5100, 1500.00);
  SELECT id INTO trip_completed FROM trips WHERE vehicle_id = v_a2 AND driver_id = d_a2 AND origin='Warehouse X' AND destination='Client Y' AND status='Completed' LIMIT 1;

  -- Dispatched trip using v_ontrip and d_ontrip (sets vehicle/driver to OnTrip in real app)
  INSERT INTO trips(id,vehicle_id,driver_id,cargo_weight,origin,destination,status,start_odometer,revenue)
    VALUES (gen_random_uuid(), v_ontrip, d_ontrip, 1200, 'Depot A', 'Depot B', 'Dispatched', 150000, 3000.00);
  SELECT id INTO trip_dispatched FROM trips WHERE vehicle_id = v_ontrip AND driver_id = d_ontrip AND origin='Depot A' AND destination='Depot B' AND status='Dispatched' LIMIT 1;

  -- Update vehicle and driver statuses to reflect dispatched trip
  UPDATE vehicles SET status = 'OnTrip' WHERE id = v_ontrip;
  UPDATE drivers SET status = 'OnTrip' WHERE id = d_ontrip;

  -- Maintenance log for v_inshop (trigger will set vehicle to InShop)
  INSERT INTO maintenance_logs(id,vehicle_id,description,cost,service_date)
    VALUES (gen_random_uuid(), v_inshop, 'Engine diagnostic and oil change', 450.00, CURRENT_DATE);

  -- Fuel logs: link to completed trip
  INSERT INTO fuel_logs(id,vehicle_id,trip_id,liters,cost,date)
    VALUES (gen_random_uuid(), v_a2, trip_completed, 150.00, 200.00, CURRENT_DATE);

  -- Additional fuel log for another vehicle (no trip)
  INSERT INTO fuel_logs(id,vehicle_id,liters,cost,date)
    VALUES (gen_random_uuid(), v_a1, 50.00, 70.00, CURRENT_DATE);

END;
$$ LANGUAGE plpgsql;

-- Quick checks (select counts)
-- SELECT COUNT(*) FROM users;
-- SELECT COUNT(*) FROM vehicles WHERE status='Available';
-- SELECT COUNT(*) FROM vehicles WHERE status='InShop';
-- SELECT COUNT(*) FROM drivers WHERE status='Available';
-- SELECT COUNT(*) FROM trips WHERE status='Dispatched';

-- To apply: psql -d fleetflow -f db/seed.sql

select * from vehicles;
select * from drivers;
select * from users;
;
S
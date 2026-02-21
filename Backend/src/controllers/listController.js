import { Pool } from 'pg';
import * as vehiclesRepo from '../repositories/vehiclesRepository.js';
import * as driversRepo from '../repositories/driversRepository.js';
import * as tripsRepo from '../repositories/tripsRepository.js';
import * as maintRepo from '../repositories/maintenanceRepository.js';
import * as expRepo from '../repositories/expensesRepository.js';

let pool = null;

function getPool() {
  if (!pool) {
    const url = process.env.DATABASE_URL;
    const usePg = !!(url || process.env.PGHOST || process.env.PGUSER);
    if (usePg) {
      pool = url ? new Pool({ connectionString: url }) : new Pool();
    }
  }
  return pool;
}

export async function getVehicles(req, res, next) {
  try {
    const pg = getPool();
    let raw;
    if (pg) {
      const result = await pg.query('SELECT * FROM vehicles ORDER BY created_at');
      raw = result.rows;
    } else {
      raw = vehiclesRepo.allVehicles();
    }
    const mapped = raw.map(v => ({
      id: v.id,
      name: v.name,
      model: v.model || '',
      plate: v.license_plate || v.plate || '',
      type: v.type || '',
      capacity: v.max_capacity || v.capacity || 0,
      odometer: v.odometer || 0,
      status: v.status || 'Available'
    }));
    res.json(mapped);
  } catch (err) { next(err); }
}

export async function getDrivers(req, res, next) {
  try {
    const pg = getPool();
    let raw;
    if (pg) {
      const result = await pg.query('SELECT * FROM drivers ORDER BY name');
      raw = result.rows;
    } else {
      raw = await driversRepo.allDrivers();
    }
    const mapped = raw.map(d => ({
      id: d.id,
      name: d.name,
      license: d.license || d.license_number || '',
      category: d.category || d.license_category || '',
      expiry: d.expiry || d.license_expiry || null,
      status: d.status || 'Off Duty',
      trips: d.trips || 0,
      safetyScore: d.safetyScore || d.safety_score || 0,
    }));
    res.json(mapped);
  } catch (err) { next(err); }
}

export async function createDriver(req, res, next) {
  try {
    const body = req.body;
    const d = await driversRepo.createDriver({ name: body.name, license: body.license, category: body.category, expiry: body.expiry, status: body.status || 'Off Duty', trips: body.trips || 0, safetyScore: body.safetyScore || 0 });
    res.status(201).json(d);
  } catch (err) { next(err); }
}

export async function getTrips(req, res, next) {
  try {
    const pg = getPool();
    let raw;
    if (pg) {
      const result = await pg.query('SELECT * FROM trips ORDER BY created_at');
      raw = result.rows;
    } else {
      raw = tripsRepo.allTrips();
    }
    const mapped = raw.map(t => ({
      id: t.id,
      vehicleId: t.vehicle_id || t.vehicleId || '',
      driverId: t.driver_id || t.driverId || '',
      origin: t.origin || '',
      destination: t.destination || '',
      cargoWeight: t.cargo_weight || t.cargoWeight || 0,
      status: t.status || 'Draft',
      date: t.date || t.created_at || null,
      notes: t.notes || '',
      revenue: Number(t.revenue || 0),
      startOdometer: t.start_odometer ?? t.startOdometer ?? null,
      endOdometer: t.end_odometer ?? t.endOdometer ?? null,
      distanceKm: t.start_odometer != null && t.end_odometer != null
        ? Math.max(0, Number(t.end_odometer) - Number(t.start_odometer))
        : 0,
    }));
    res.json(mapped);
  } catch (err) { next(err); }
}

export async function getMaintenance(req, res, next) {
  try {
    const pg = getPool();
    if (pg) {
      const result = await pg.query('SELECT * FROM maintenance_logs ORDER BY service_date');
      const mapped = result.rows.map(m => ({
        id: m.id,
        vehicleId: m.vehicle_id,
        serviceType: m.service_type || m.description || '',
        date: m.service_date,
        cost: Number(m.cost || 0),
        notes: m.notes || m.description || ''
      }));
      res.json(mapped);
    } else {
      const raw = maintRepo.allMaintenance();
      const mapped = raw.map(m => ({
        id: m.id,
        vehicleId: m.vehicleId || m.vehicle_id,
        serviceType: m.serviceType || m.description || '',
        date: m.date || m.service_date,
        cost: Number(m.cost || 0),
        notes: m.notes || m.description || ''
      }));
      res.json(mapped);
    }
  } catch (err) { next(err); }
}

export async function getExpenses(req, res, next) {
  try {
    const pg = getPool();
    if (pg) {
      // Combine fuel logs and maintenance logs into a unified expense feed
      const result = await pg.query(`
        SELECT id,
               vehicle_id      AS "vehicleId",
               trip_id         AS "tripId",
               'Fuel'::text    AS type,
               liters,
               CASE WHEN liters > 0 THEN cost / liters ELSE 0 END AS "costPerLiter",
               cost            AS "totalCost",
               date::text      AS date,
               created_at
        FROM fuel_logs
        UNION ALL
        SELECT id,
               vehicle_id      AS "vehicleId",
               NULL::uuid      AS "tripId",
               'Maintenance'::text AS type,
               0::numeric      AS liters,
               0::numeric      AS "costPerLiter",
               cost            AS "totalCost",
               service_date::text AS date,
               created_at
        FROM maintenance_logs
        ORDER BY date, created_at
      `);
      res.json(result.rows);
    } else {
      const raw = expRepo.allExpenses();
      const maint = maintRepo.allMaintenance();
      const mappedExpenses = raw.map(e => ({
        id: e.id,
        vehicleId: e.vehicleId || e.vehicle_id,
        tripId: e.tripId || e.trip_id || null,
        type: e.type || 'Fuel',
        liters: Number(e.liters || 0),
        costPerLiter: Number(e.costPerLiter || e.cost_per_liter || 0),
        totalCost: Number(e.totalCost || e.total_cost || 0),
        date: e.date
      }));
      const mappedMaint = maint.map(m => ({
        id: m.id,
        vehicleId: m.vehicleId || m.vehicle_id,
        tripId: null,
        type: 'Maintenance',
        liters: 0,
        costPerLiter: 0,
        totalCost: Number(m.cost || 0),
        date: m.date || m.service_date
      }));
      res.json([...mappedExpenses, ...mappedMaint]);
    }
  } catch (err) { next(err); }
}

export async function createMaintenance(req, res, next) {
  try {
    const pg = getPool();
    const body = req.body;
    if (pg) {
      const text = `
        INSERT INTO maintenance_logs (vehicle_id, description, cost, service_date)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `;
      const values = [
        body.vehicle_id || body.vehicleId,
        body.serviceType || body.description || '',
        body.cost,
        body.date
      ];
      const result = await pg.query(text, values);
      const m = result.rows[0];
      const mapped = {
        id: m.id,
        vehicleId: m.vehicle_id,
        serviceType: m.service_type || m.description || body.serviceType || '',
        date: m.service_date,
        cost: Number(m.cost || 0),
        notes: body.notes || ''
      };
      res.status(201).json(mapped);
    } else {
      const rec = maintRepo.createMaintenance(body);
      res.status(201).json(rec);
    }
  } catch (err) { next(err); }
}

export async function createExpense(req, res, next) {
  try {
    const pg = getPool();
    const body = req.body;
    if (pg) {
      // Only fuel expenses are stored in fuel_logs; maintenance is derived from maintenance_logs
      const liters = Number(body.liters || 0);
      const explicitTotal = body.total_cost || body.totalCost || body.cost;
      const cost = explicitTotal != null ? Number(explicitTotal) : liters * Number(body.cost_per_liter || body.costPerLiter || 0);
      const text = `
        INSERT INTO fuel_logs (vehicle_id, trip_id, liters, cost, date)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
      `;
      const values = [
        body.vehicle_id || body.vehicleId,
        body.trip_id || body.tripId || null,
        liters,
        cost,
        body.date
      ];
      const result = await pg.query(text, values);
      const f = result.rows[0];
      const mapped = {
        id: f.id,
        vehicleId: f.vehicle_id,
        tripId: f.trip_id,
        type: 'Fuel',
        liters: Number(f.liters || 0),
        costPerLiter: Number(f.liters || 0) > 0 ? Number(f.cost) / Number(f.liters) : 0,
        totalCost: Number(f.cost || 0),
        date: f.date
      };
      res.status(201).json(mapped);
    } else {
      const rec = expRepo.createExpense(body);
      res.status(201).json(rec);
    }
  } catch (err) { next(err); }
}

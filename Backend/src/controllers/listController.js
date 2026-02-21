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
      notes: t.notes || ''
    }));
    res.json(mapped);
  } catch (err) { next(err); }
}

export async function getMaintenance(req, res, next) {
  try {
    const pg = getPool();
    if (pg) {
      const result = await pg.query('SELECT * FROM maintenance_logs ORDER BY service_date');
      res.json(result.rows);
    } else {
      const raw = maintRepo.allMaintenance();
      res.json(raw);
    }
  } catch (err) { next(err); }
}

export async function getExpenses(req, res, next) {
  try {
    const pg = getPool();
    if (pg) {
      const result = await pg.query('SELECT * FROM fuel_logs ORDER BY date');
      res.json(result.rows);
    } else {
      const raw = expRepo.allExpenses();
      res.json(raw);
    }
  } catch (err) { next(err); }
}

export function createMaintenance(req, res, next) {
  try {
    const body = req.body;
    const rec = maintRepo.createMaintenance(body);
    res.status(201).json(rec);
  } catch (err) { next(err); }
}

export function createExpense(req, res, next) {
  try {
    const body = req.body;
    const rec = expRepo.createExpense(body);
    res.status(201).json(rec);
  } catch (err) { next(err); }
}

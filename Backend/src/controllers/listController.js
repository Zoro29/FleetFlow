import * as vehiclesRepo from '../repositories/vehiclesRepository.js';
import * as driversRepo from '../repositories/driversRepository.js';
import * as tripsRepo from '../repositories/tripsRepository.js';
import * as maintRepo from '../repositories/maintenanceRepository.js';
import * as expRepo from '../repositories/expensesRepository.js';

export function getVehicles(req, res, next) {
  try {
    const raw = vehiclesRepo.allVehicles();
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

export function getDrivers(req, res, next) {
  try {
    const raw = driversRepo.allDrivers();
    const mapped = raw.map(d => ({
      id: d.id,
      name: d.name,
      license: d.license || '',
      category: d.category || '',
      expiry: d.expiry || null,
      status: d.status || 'Off Duty',
      trips: d.trips || 0,
      safetyScore: d.safetyScore || d.safety_score || 0,
    }));
    res.json(mapped);
  } catch (err) { next(err); }
}

export function createDriver(req, res, next) {
  try {
    const body = req.body;
    const d = driversRepo.createDriver({ name: body.name, license: body.license, category: body.category, expiry: body.expiry, status: body.status || 'Off Duty', trips: body.trips || 0, safetyScore: body.safetyScore || 0 });
    res.status(201).json(d);
  } catch (err) { next(err); }
}

export function getTrips(req, res, next) {
  try {
    const raw = tripsRepo.allTrips();
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

export function getMaintenance(req, res, next) {
  try {
    const raw = maintRepo.allMaintenance();
    res.json(raw);
  } catch (err) { next(err); }
}

export function getExpenses(req, res, next) {
  try {
    const raw = expRepo.allExpenses();
    res.json(raw);
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

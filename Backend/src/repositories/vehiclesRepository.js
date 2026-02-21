import * as db from './inMemoryDB.js';

const TABLE = 'vehicles';

export function createVehicle(v) {
  return db.insert(TABLE, v);
}

export function findById(id) {
  return db.findById(TABLE, id);
}

export function findByLicense(license) {
  return db.find(TABLE, (x) => x.license_plate === license)[0] || null;
}

export function updateVehicle(id, patch) {
  return db.update(TABLE, id, patch);
}

export function allVehicles() {
  return db.all(TABLE);
}

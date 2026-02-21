import * as db from './inMemoryDB.js';

const TABLE = 'drivers';

export function createDriver(d) {
  return db.insert(TABLE, d);
}

export function findById(id) {
  return db.findById(TABLE, id);
}

export function updateDriver(id, patch) {
  return db.update(TABLE, id, patch);
}

export function allDrivers() {
  return db.all(TABLE);
}

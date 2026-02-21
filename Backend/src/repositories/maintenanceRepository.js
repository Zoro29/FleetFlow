import * as db from './inMemoryDB.js';

const TABLE = 'maintenance_logs';

export function createMaintenance(m) {
  return db.insert(TABLE, m);
}

export function allMaintenance() {
  return db.all(TABLE);
}

export function findById(id) {
  return db.findById(TABLE, id);
}

export function updateMaintenance(id, patch) {
  return db.update(TABLE, id, patch);
}

export default {};

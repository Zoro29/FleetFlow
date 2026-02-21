import * as db from './inMemoryDB.js';

const TABLE = 'trips';

export function createTrip(t) {
  return db.insert(TABLE, t);
}

export function findById(id) {
  return db.findById(TABLE, id);
}

export function updateTrip(id, patch) {
  return db.update(TABLE, id, patch);
}

export function findByVehicleId(vehicleId) {
  return db.find(TABLE, (t) => t.vehicle_id === vehicleId);
}

export function allTrips() {
  return db.all(TABLE);
}

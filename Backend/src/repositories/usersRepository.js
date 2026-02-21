import * as db from './inMemoryDB.js';

const TABLE = 'users';

export function createUser(user) {
  return db.insert(TABLE, user);
}

export function findByEmail(email) {
  return db.find(TABLE, (u) => u.email === email)[0] || null;
}

export function findById(id) {
  return db.findById(TABLE, id);
}

export function updateUser(id, patch) {
  return db.update(TABLE, id, patch);
}

export function allUsers() {
  return db.all(TABLE);
}

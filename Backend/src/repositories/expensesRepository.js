import * as db from './inMemoryDB.js';

const TABLE = 'expenses';

export function createExpense(e) {
  return db.insert(TABLE, e);
}

export function allExpenses() {
  return db.all(TABLE);
}

export function findById(id) {
  return db.findById(TABLE, id);
}

export function updateExpense(id, patch) {
  return db.update(TABLE, id, patch);
}

export default {};

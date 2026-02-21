import { v4 as uuidv4 } from 'uuid';

// Very small in-memory DB with simple locking semantics for demo
const db = new Map();
const locks = new Map();

function ensureTable(name) {
  if (!db.has(name)) db.set(name, new Map());
}

export function insert(table, record) {
  ensureTable(table);
  const id = record.id || uuidv4();
  const copy = { ...record, id };
  db.get(table).set(id, copy);
  return copy;
}

export function findById(table, id) {
  ensureTable(table);
  return db.get(table).get(id) || null;
}

export function find(table, predicate) {
  ensureTable(table);
  return Array.from(db.get(table).values()).filter(predicate);
}

export function update(table, id, patch) {
  ensureTable(table);
  const existing = db.get(table).get(id);
  if (!existing) return null;
  const updated = { ...existing, ...patch };
  db.get(table).set(id, updated);
  return updated;
}

export async function withLocks(ids, fn) {
  // Acquire locks in deterministic order to avoid deadlocks
  const sorted = [...new Set(ids)].sort();
  const promises = [];
  for (const id of sorted) {
    let p = locks.get(id);
    while (p) {
      await p;
      p = locks.get(id);
    }
    // create a placeholder promise resolver
    let resolve;
    const lockPromise = new Promise((res) => (resolve = res));
    locks.set(id, lockPromise);
    promises.push(resolve);
  }

  try {
    return await fn();
  } finally {
    // release in reverse order
    for (let i = promises.length - 1; i >= 0; i--) promises[i]();
    for (const id of sorted) locks.delete(id);
  }
}

export function all(table) {
  ensureTable(table);
  return Array.from(db.get(table).values());
}

export default db;

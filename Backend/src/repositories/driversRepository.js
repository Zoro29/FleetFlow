import { Pool } from 'pg';
import * as inmemory from './inMemoryDB.js';

const USE_PG = !!(process.env.DATABASE_URL || process.env.PGHOST || process.env.PGUSER);
let pool;
if (USE_PG) pool = new Pool();

const TABLE = 'drivers';

export async function createDriver(d) {
  if (USE_PG) {
    const q = `INSERT INTO drivers(name,license,category,expiry,status,trips,safety_score) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *`;
    const vals = [d.name, d.license, d.category, d.expiry || null, d.status || 'Off Duty', d.trips || 0, d.safetyScore || d.safety_score || 0];
    const res = await pool.query(q, vals);
    return res.rows[0];
  }
  return inmemory.insert(TABLE, d);
}

export async function findById(id) {
  if (USE_PG) {
    const res = await pool.query('SELECT * FROM drivers WHERE id=$1 LIMIT 1', [id]);
    return res.rows[0] || null;
  }
  return inmemory.findById(TABLE, id);
}

export async function updateDriver(id, patch) {
  if (USE_PG) {
    const fields = Object.keys(patch);
    const sets = fields.map((f, i) => `${f}=$${i + 2}`).join(', ');
    const vals = [id, ...fields.map((k) => patch[k])];
    const q = `UPDATE drivers SET ${sets} WHERE id=$1 RETURNING *`;
    const res = await pool.query(q, vals);
    return res.rows[0] || null;
  }
  return inmemory.update(TABLE, id, patch);
}

export async function allDrivers() {
  if (USE_PG) {
    const res = await pool.query('SELECT * FROM drivers ORDER BY name');
    return res.rows;
  }
  return inmemory.all(TABLE);
}

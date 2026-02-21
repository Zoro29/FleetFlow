import { Pool } from 'pg';
import * as inmemory from './inMemoryDB.js';

const USE_PG = !!(process.env.DATABASE_URL || process.env.PGHOST || process.env.PGUSER);

let pool;
if (USE_PG) {
  pool = new Pool();
}

const TABLE = 'users';

export async function createUser(user) {
  if (USE_PG) {
    const q = `INSERT INTO users(name,email,password_hash,role) VALUES($1,$2,$3,$4) RETURNING *`;
    const vals = [user.name, user.email, user.password_hash, user.role];
    const res = await pool.query(q, vals);
    return res.rows[0];
  }
  return inmemory.insert(TABLE, user);
}

export async function findByEmail(email) {
  if (USE_PG) {
    const res = await pool.query('SELECT * FROM users WHERE email=$1 LIMIT 1', [email]);
    return res.rows[0] || null;
  }
  return inmemory.find(TABLE, (u) => u.email === email)[0] || null;
}

export async function findById(id) {
  if (USE_PG) {
    const res = await pool.query('SELECT * FROM users WHERE id=$1 LIMIT 1', [id]);
    return res.rows[0] || null;
  }
  return inmemory.findById(TABLE, id);
}

export async function updateUser(id, patch) {
  if (USE_PG) {
    const fields = Object.keys(patch);
    const sets = fields.map((f, i) => `${f}=$${i + 2}`).join(', ');
    const vals = [id, ...fields.map((k) => patch[k])];
    const q = `UPDATE users SET ${sets} WHERE id=$1 RETURNING *`;
    const res = await pool.query(q, vals);
    return res.rows[0] || null;
  }
  return inmemory.update(TABLE, id, patch);
}

export async function allUsers() {
  if (USE_PG) {
    const res = await pool.query('SELECT * FROM users');
    return res.rows;
  }
  return inmemory.all(TABLE);
}

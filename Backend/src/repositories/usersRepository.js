import { Pool } from 'pg';
import * as inmemory from './inMemoryDB.js';

let pool = null;

function getPool() {
  // Evaluate env variables lazily so dotenv.config() has already run
  if (!pool) {
    const url = process.env.DATABASE_URL;
    const usePg = !!(url || process.env.PGHOST || process.env.PGUSER);
    if (usePg) {
      pool = url ? new Pool({ connectionString: url }) : new Pool();
    }
  }
  return pool;
}

const TABLE = 'users';

export async function createUser(user) {
  const pg = getPool();
  if (pg) {
    const q = `INSERT INTO users(name,email,password_hash,role) VALUES($1,$2,$3,$4) RETURNING *`;
    const vals = [user.name, user.email, user.password_hash, user.role];
    const res = await pg.query(q, vals);
    return res.rows[0];
  }
  return inmemory.insert(TABLE, user);
}

export async function findByEmail(email) {
  const pg = getPool();
  if (pg) {
    const res = await pg.query('SELECT * FROM users WHERE email=$1 LIMIT 1', [email]);
    return res.rows[0] || null;
  }
  return inmemory.find(TABLE, (u) => u.email === email)[0] || null;
}

export async function findById(id) {
  const pg = getPool();
  if (pg) {
    const res = await pg.query('SELECT * FROM users WHERE id=$1 LIMIT 1', [id]);
    return res.rows[0] || null;
  }
  return inmemory.findById(TABLE, id);
}

export async function updateUser(id, patch) {
  const pg = getPool();
  if (pg) {
    const fields = Object.keys(patch);
    const sets = fields.map((f, i) => `${f}=$${i + 2}`).join(', ');
    const vals = [id, ...fields.map((k) => patch[k])];
    const q = `UPDATE users SET ${sets} WHERE id=$1 RETURNING *`;
    const res = await pg.query(q, vals);
    return res.rows[0] || null;
  }
  return inmemory.update(TABLE, id, patch);
}

export async function allUsers() {
  const pg = getPool();
  if (pg) {
    const res = await pg.query('SELECT * FROM users');
    return res.rows;
  }
  return inmemory.all(TABLE);
}

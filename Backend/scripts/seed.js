import fs from 'fs/promises';
import path from 'path';
import { Client } from 'pg';

const SCHEMA_FILE = path.join(process.cwd(), 'db', 'schema.sql');
const SEED_FILE = path.join(process.cwd(), 'db', 'seed.sql');

function getConnOptions(dbName = 'postgres') {
  // Use DATABASE_URL if provided, otherwise construct from PG env vars
  if (process.env.DATABASE_URL) return { connectionString: process.env.DATABASE_URL.replace(/\/([^/]+)$/, `/${dbName}`) };
  const user = process.env.PGUSER || process.env.USER || 'postgres';
  const host = process.env.PGHOST || 'localhost';
  const port = process.env.PGPORT || 5432;
  const password = process.env.PGPASSWORD || process.env.PASSWORD || undefined;
  return {
    user,
    host,
    port,
    password,
    database: dbName,
  };
}

async function run() {
  try {
    console.log('Reading SQL files...');
    const schemaSql = await fs.readFile(SCHEMA_FILE, 'utf8');
    const seedSql = await fs.readFile(SEED_FILE, 'utf8');

    // Connect to default 'postgres' DB to create 'fleetflow' if missing
    const adminClient = new Client(getConnOptions('postgres'));
    await adminClient.connect();

    const dbName = process.env.DB_NAME || 'fleetflow';
    const exists = await adminClient.query('SELECT 1 FROM pg_database WHERE datname = $1', [dbName]);
    if (exists.rowCount === 0) {
      console.log(`Creating database '${dbName}'...`);
      await adminClient.query(`CREATE DATABASE ${dbName}`);
    } else {
      console.log(`Database '${dbName}' already exists.`);
    }
    await adminClient.end();

    // Connect to target database and run schema + seed
    const client = new Client(getConnOptions(dbName));
    await client.connect();

    console.log('Applying schema...');
    await client.query(schemaSql);
    console.log('Schema applied.');

    console.log('Applying seed...');
    await client.query(seedSql);
    console.log('Seed applied.');

    await client.end();
    console.log('Done. You can now connect to the database.');
  } catch (err) {
    console.error('Error running seed script:', err.message || err);
    console.error(err);
    process.exit(1);
  }
}

run();


import { spawnSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

// Load .env if present
const envPath = path.resolve(process.cwd(), '.env');
if (fs.existsSync(envPath)) dotenv.config({ path: envPath });

const seedFile = path.resolve(process.cwd(), 'db', 'seed.sql');
const schemaFile = path.resolve(process.cwd(), 'db', 'schema.sql');
if (!fs.existsSync(seedFile)) {
  console.error('seed.sql not found at', seedFile);
  process.exit(1);
}

const DATABASE_URL = process.env.DATABASE_URL;
const PGHOST = process.env.PGHOST || 'localhost';
const PGPORT = process.env.PGPORT || '5432';
const PGUSER = process.env.PGUSER || process.env.USER || 'postgres';
const PGPASSWORD = process.env.PGPASSWORD || process.env.PASSWORD || '';
const DB_NAME = process.env.DB_NAME || process.env.POSTGRES_DB || 'fleetflow';

function runPsql(args, env = process.env, inherit = true) {
  console.log('Running: psql', args.join(' '));
  const options = { env };
  if (inherit) options.stdio = 'inherit';
  return spawnSync('psql', args, { ...options, encoding: 'utf8' });
}

function runPsqlCapture(args, env = process.env) {
  // capture stdout for checks
  return spawnSync('psql', args, { env, encoding: 'utf8' });
}

function checkLocalPsqlAvailable() {
  const res = spawnSync('psql', ['--version'], { encoding: 'utf8' });
  return !(res.error && res.error.code === 'ENOENT');
}

function tryDockerFullFallback(schemaPath, seedPath) {
  const containerName = process.env.DOCKER_DB_CONTAINER || 'fleetflow_db';
  console.log('Attempting docker fallback using container:', containerName);

  // Copy seed and schema into container
  const cpSeed = spawnSync('docker', ['cp', seedPath, `${containerName}:/tmp/seed.sql`], { stdio: 'inherit' });
  if (cpSeed.error) {
    console.error('Docker cp failed:', cpSeed.error.message || cpSeed.error);
    console.error('Ensure Docker is running and the DB container exists.');
    process.exit(1);
  }
  if (cpSeed.status !== 0) process.exit(cpSeed.status || 1);

  let copiedSchema = false;
  if (fs.existsSync(schemaPath)) {
    const cpSchema = spawnSync('docker', ['cp', schemaPath, `${containerName}:/tmp/schema.sql`], { stdio: 'inherit' });
    if (cpSchema.error) {
      console.error('Docker cp schema failed:', cpSchema.error.message || cpSchema.error);
      process.exit(1);
    }
    if (cpSchema.status !== 0) process.exit(cpSchema.status || 1);
    copiedSchema = true;
  }

  // determine DB user inside container
  let dockerDbUser = null;
  try {
    const envRes = spawnSync('docker', ['exec', containerName, 'printenv', 'POSTGRES_USER'], { encoding: 'utf8' });
    if (!envRes.error && envRes.status === 0 && envRes.stdout) dockerDbUser = envRes.stdout.trim();
  } catch (e) {}
  dockerDbUser = dockerDbUser || process.env.POSTGRES_USER || process.env.PGUSER || PGUSER || 'postgres';

  // Check if DB exists inside container
  const check = spawnSync('docker', ['exec', containerName, 'psql', '-U', dockerDbUser, '-d', 'postgres', '-tAc', `SELECT 1 FROM pg_database WHERE datname='${DB_NAME}'`], { encoding: 'utf8' });
  if (check.error) {
    console.error('Docker exec check failed:', check.error.message || check.error);
    process.exit(1);
  }
  const exists = (check.stdout || '').trim() === '1';
  if (!exists) {
    console.log(`Database '${DB_NAME}' not found in container — creating...`);
    const create = spawnSync('docker', ['exec', containerName, 'psql', '-U', dockerDbUser, '-d', 'postgres', '-c', `CREATE DATABASE ${DB_NAME}`], { stdio: 'inherit' });
    if (create.error) {
      console.error('Failed to create DB in container:', create.error.message || create.error);
      process.exit(1);
    }
    if (create.status !== 0) process.exit(create.status || 1);
  } else {
    console.log(`Database '${DB_NAME}' already exists in container.`);
  }

  // Apply schema then seed inside container
  if (copiedSchema) {
    const schemaRes = spawnSync('docker', ['exec', containerName, 'psql', '-U', dockerDbUser, '-d', DB_NAME, '-f', '/tmp/schema.sql'], { stdio: 'inherit' });
    if (schemaRes.error) { console.error('Schema apply failed:', schemaRes.error.message || schemaRes.error); process.exit(1); }
    if (schemaRes.status !== 0) process.exit(schemaRes.status || 1);
  }

  const seedRes = spawnSync('docker', ['exec', containerName, 'psql', '-U', dockerDbUser, '-d', DB_NAME, '-f', '/tmp/seed.sql'], { stdio: 'inherit' });
  if (seedRes.error) { console.error('Seed apply failed:', seedRes.error.message || seedRes.error); process.exit(1); }
  if (seedRes.status !== 0) process.exit(seedRes.status || 1);

  // cleanup
  spawnSync('docker', ['exec', containerName, 'rm', '-f', '/tmp/seed.sql']);
  if (copiedSchema) spawnSync('docker', ['exec', containerName, 'rm', '-f', '/tmp/schema.sql']);

  console.log('Database schema and seed applied via Docker');
}

if (DATABASE_URL) {
  // If a DATABASE_URL is provided, apply schema then seed to that URL
  if (fs.existsSync(schemaFile)) {
    const r1 = runPsql([DATABASE_URL, '-f', schemaFile], { ...process.env, PGPASSWORD });
    if (r1 && r1.error && r1.error.code === 'ENOENT') {
      tryDockerFullFallback(schemaFile, seedFile);
    } else if (r1 && r1.status !== 0) process.exit(r1.status || 1);
  }
  const r2 = runPsql([DATABASE_URL, '-f', seedFile], { ...process.env, PGPASSWORD });
  if (r2 && r2.error && r2.error.code === 'ENOENT') {
    tryDockerFullFallback(schemaFile, seedFile);
  } else if (r2 && r2.status !== 0) process.exit(r2.status || 1);
} else {
  // No DATABASE_URL: try local psql first (create DB if missing), else Docker fallback
  if (!checkLocalPsqlAvailable()) {
    tryDockerFullFallback(schemaFile, seedFile);
  } else {
    const env = { ...process.env, PGPASSWORD };
    // check if DB exists by connecting to 'postgres'
    const checkArgs = ['-h', PGHOST, '-p', PGPORT, '-U', PGUSER, '-d', 'postgres', '-tAc', `SELECT 1 FROM pg_database WHERE datname='${DB_NAME}'`];
    const check = runPsqlCapture(checkArgs, env);
    if (check && check.error && check.error.code === 'ENOENT') {
      tryDockerFullFallback(schemaFile, seedFile);
    } else {
      const exists = (check.stdout || '').trim() === '1';
      if (!exists) {
        console.log(`Database '${DB_NAME}' not found — creating...`);
        const createArgs = ['-h', PGHOST, '-p', PGPORT, '-U', PGUSER, '-d', 'postgres', '-c', `CREATE DATABASE ${DB_NAME}`];
        const createRes = runPsql(createArgs, env);
        if (createRes && createRes.error && createRes.error.code === 'ENOENT') {
          tryDockerFullFallback(schemaFile, seedFile);
        }
        if (createRes && createRes.status !== 0) process.exit(createRes.status || 1);
      } else {
        console.log(`Database '${DB_NAME}' already exists.`);
      }

      // Apply schema if present
      if (fs.existsSync(schemaFile)) {
        const sRes = runPsql(['-h', PGHOST, '-p', PGPORT, '-U', PGUSER, '-d', DB_NAME, '-f', schemaFile], env);
        if (sRes && sRes.error && sRes.error.code === 'ENOENT') {
          tryDockerFullFallback(schemaFile, seedFile);
        }
        if (sRes && sRes.status !== 0) process.exit(sRes.status || 1);
      }

      // Apply seed
      const seedRes = runPsql(['-h', PGHOST, '-p', PGPORT, '-U', PGUSER, '-d', DB_NAME, '-f', seedFile], env);
      if (seedRes && seedRes.error && seedRes.error.code === 'ENOENT') {
        tryDockerFullFallback(schemaFile, seedFile);
      }
      if (seedRes && seedRes.status !== 0) process.exit(seedRes.status || 1);
    }
  }
}

console.log('Database seed applied.');

// Ensure seeded users have valid bcrypt password hashes so they can log in from the frontend
(async () => {
  try {
    // Lazy-import to avoid adding pg dependency when not needed
    const bcrypt = (await import('bcryptjs')).default;
    const usersRepo = await import('../src/repositories/usersRepository.js');
    const accounts = [
      { email: 'alice@fleet.local', name: 'Alice Manager', role: 'Manager', password: 'password123' },
      { email: 'bob@fleet.local', name: 'Bob Dispatcher', role: 'Dispatcher', password: 'password123' },
    ];

    for (const acc of accounts) {
      try {
        const existing = await usersRepo.findByEmail(acc.email);
        const hash = await bcrypt.hash(acc.password, 10);
        if (existing) {
          // update password if it's the placeholder 'seed_hash' or empty
          if (!existing.password_hash || existing.password_hash === 'seed_hash') {
            await usersRepo.updateUser(existing.id, { password_hash: hash });
            console.log(`Updated password for ${acc.email}`);
          } else {
            console.log(`User ${acc.email} already has a password`);
          }
        } else {
          const created = await usersRepo.createUser({ name: acc.name, email: acc.email, password_hash: hash, role: acc.role });
          console.log(`Created user ${created.email}`);
        }
      } catch (inner) {
        console.warn('Could not ensure account', acc.email, inner.message || inner);
      }
    }
  } catch (e) {
    // Non-fatal: users will need to register manually if this step fails
    console.warn('Skipping seeded account setup:', e.message || e);
  }
})();
FleetFlow Backend scaffold

This is a minimal, layered Node/Express scaffold demonstrating the requested architecture and core flows:

- controllers -> services -> repositories -> inMemoryDB
- auth via JWT
- role-based guards
- trip creation/completion implemented inside a simulated transaction (locking by id)

Quick start:

1. cd Backend
2. npm install
3. npm run dev

Notes:
- This scaffold uses an in-memory store (not production ready). Replace repositories with a real DB adapter.
- The trip transaction uses a simple lock wrapper to simulate SELECT ... FOR UPDATE semantics. Use DB transactions in production.

Database setup
----------------
This project includes a PostgreSQL schema at `db/schema.sql` implementing the production-ready schema:

- ENUM types for roles and state machines
- FK constraints, CHECK constraints and indexes
- Views for derived metrics and triggers for auto state changes

To create a local database and apply the schema using `psql` (Postgres must be installed):

```bash
# create database (run as a superuser or postgres user)
createdb fleetflow

# apply schema
psql -d fleetflow -f db/schema.sql
```

If you prefer a Node-based migration runner I can add a small script using `pg` to run the SQL automatically—ask and I'll add it.

Seeding demo data
-----------------
After the schema applies you can populate demo data (vehicles, drivers, trips, maintenance, fuel) using the provided `db/seed.sql`:

```bash
# run seed (assumes `fleetflow` DB exists and schema applied)
psql -d fleetflow -f db/seed.sql

# quick manual checks inside psql
\c fleetflow
SELECT count(*) FROM vehicles;
SELECT * FROM vehicle_operational_cost LIMIT 5;
SELECT * FROM trip_fuel_efficiency LIMIT 5;
```

If you want, I can also add a small `scripts/seed.js` using `pg` to run the schema+seed automatically from Node.

Docker (recommended)
--------------------
If you have Docker, this is the easiest, most reproducible option. A `docker-compose.yml` is included at the project root (`Backend/docker-compose.yml`). It will:

- Start Postgres 16
- Create the `fleetflow` database
- Auto-run `db/schema.sql` at container init

Quick start with Docker:

```bash
# start DB (runs in foreground)
docker compose up

# in another terminal, install node deps and run the app
cd Backend
npm install
npm run dev
```

To tear down and remove DB volume:

```bash
docker compose down -v
```

Notes:
- The compose file exposes Postgres on port `5432` with credentials `fleet`/`fleetpass` and DB `fleetflow`.
- If you prefer to run seeds from Node instead of the init SQL file, run `npm run db:seed` after the DB becomes ready.

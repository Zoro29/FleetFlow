FleetFlow Backend Scaffold

This is my minimal, layered Node/Express scaffold demonstrating the required architecture and core flows:

controllers → services → repositories → inMemoryDB

authentication using JWT

role-based guards

trip creation and completion implemented inside a simulated transaction (locking by id)

Quick Start

cd Backend

npm install

npm run dev

Notes

This scaffold uses an in-memory store and is not production-ready. I plan to replace the repositories with a real database adapter.

The trip transaction uses a simple lock wrapper to simulate SELECT ... FOR UPDATE semantics. In production, I would use real database transactions.

Database Setup

I’ve included a PostgreSQL schema at db/schema.sql that implements a production-ready schema with:

ENUM types for roles and state machines

Foreign key constraints, CHECK constraints, and indexes

Views for derived metrics and triggers for automatic state changes

To create a local database and apply the schema using psql (Postgres must be installed):

# create database (run as a superuser or postgres user)
createdb fleetflow

# apply schema
psql -d fleetflow -f db/schema.sql

If needed, I can also add a small Node-based migration runner using pg to execute the SQL automatically.

Seeding Demo Data

After applying the schema, I can populate demo data (vehicles, drivers, trips, maintenance, fuel) using db/seed.sql:

# run seed (assumes `fleetflow` DB exists and schema applied)
psql -d fleetflow -f db/seed.sql

# quick manual checks inside psql
\c fleetflow
SELECT count(*) FROM vehicles;
SELECT * FROM vehicle_operational_cost LIMIT 5;
SELECT * FROM trip_fuel_efficiency LIMIT 5;

If needed, I can also add a scripts/seed.js file using pg to run the schema and seed automatically from Node.

Docker (Recommended)

If I have Docker installed, this is the easiest and most reproducible setup. I’ve included a docker-compose.yml file at the project root (Backend/docker-compose.yml) that:

Starts PostgreSQL 16

Creates the fleetflow database

Automatically runs db/schema.sql during container initialization

Quick Start with Docker
# start DB (runs in foreground)
docker compose up

In another terminal:

cd Backend
npm install
npm run dev

To tear down and remove the database volume:

docker compose down -v
Notes on Docker Setup

The compose file exposes PostgreSQL on port 5432 with credentials:

User: fleet

Password: fleetpass

Database: fleetflow

If I prefer to run seeds from Node instead of using the init SQL file, I can run:

npm run db:seed

after the database becomes ready.
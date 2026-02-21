# FleetFlow

Let the fun Begin . 

Getting started (Backend)
-------------------------

This repo includes a Docker-based Postgres database and a Node/Express backend scaffold.

Quick start (recommended - Docker):

1. From the project root, start the DB:

```powershell
cd Backend
docker compose up -d
```

2. Install backend dependencies and run the server:

```powershell
cd Backend
npm install
npm run dev
```

3. Verify the database (run these while the container is up):

```powershell
# count users
docker exec -it fleetflow_db psql -U fleet -d fleetflow -c "SELECT count(*) FROM users;"

# show operational cost view
docker exec -it fleetflow_db psql -U fleet -d fleetflow -c "SELECT * FROM vehicle_operational_cost LIMIT 5;"

# show trip fuel efficiency
docker exec -it fleetflow_db psql -U fleet -d fleetflow -c "SELECT * FROM trip_fuel_efficiency LIMIT 5;"
```

If you don't have Docker, install PostgreSQL locally or use a hosted DB and set `DATABASE_URL` before running `npm run initiate`.

Running the database seeder
---------------------------

From the project root you can seed the database using the provided script. The script will try to use the local `psql` client first and will fall back to running `psql` inside the Docker DB container if the client is not available.

1. Ensure the DB is running (Docker recommended):

```powershell
cd Backend
docker compose up -d
```

2. Run the seeder:

```powershell
cd Backend
npm run initiate
```

Notes:
- If `psql` is not installed locally, the script copies `db/seed.sql` into the DB container (`fleetflow_db`) and executes it there.
- If your DB container uses a different name, set the environment variable `DOCKER_DB_CONTAINER` before running the script, e.g. `SET DOCKER_DB_CONTAINER=my_db` (Windows PowerShell) or `export DOCKER_DB_CONTAINER=my_db` (bash).
- To make the original local-psql workflow work, install the PostgreSQL client (Windows example via Chocolatey):

```powershell
choco install postgresql
```

See `Backend/scripts/initiate.js` for implementation details and behavior.

To stop and remove the DB volume:

```powershell
docker compose down -v
```

If you want a short walkthrough or to have me run more verification queries, tell me which checks you'd like and I'll provide the exact commands.

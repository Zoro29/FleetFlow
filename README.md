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

If you don't have Docker, install PostgreSQL locally or use a hosted DB and set `DATABASE_URL` before running `npm run db:seed`.

To stop and remove the DB volume:

```powershell
docker compose down -v
```

If you want a short walkthrough or to have me run more verification queries, tell me which checks you'd like and I'll provide the exact commands.

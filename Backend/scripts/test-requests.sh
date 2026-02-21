#!/usr/bin/env bash
# Simple curl script to exercise auth and protected vehicle creation
BASE=http://localhost:3000/api

# Register
curl -s -X POST $BASE/auth/register -H "Content-Type: application/json" -d '{"name":"CLI Tester","email":"cli+1@fleet.local","password":"pass1234","role":"Dispatcher"}'

echo
# Login
TOKEN=$(curl -s -X POST $BASE/auth/login -H "Content-Type: application/json" -d '{"email":"cli+1@fleet.local","password":"pass1234"}' | jq -r .token)

echo "TOKEN=$TOKEN"
# Create vehicle
curl -s -X POST $BASE/vehicles -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"name":"CLI Truck","license_plate":"CLI-001","max_capacity":1000}'

echo

import * as db from '../repositories/inMemoryDB.js';
import { findById as findVehicleById, updateVehicle } from '../repositories/vehiclesRepository.js';
import { findById as findDriverById, updateDriver } from '../repositories/driversRepository.js';
import { createTrip, updateTrip, findById as findTripById } from '../repositories/tripsRepository.js';
import { checkLicenseValid } from './driverService.js';

export async function createTripTransaction({ vehicle_id, driver_id, cargo_weight, origin, destination }) {
  // Lock both vehicle and driver by id to simulate SELECT ... FOR UPDATE
  const lockIds = [`vehicle:${vehicle_id}`, `driver:${driver_id}`];
  return db.withLocks(lockIds, async () => {
    const vehicle = findVehicleById(vehicle_id);
    const driver = findDriverById(driver_id);
    if (!vehicle) throw { status: 404, message: 'Vehicle not found' };
    if (!driver) throw { status: 404, message: 'Driver not found' };
    if (vehicle.status !== 'Available') throw { status: 400, message: 'Vehicle not available' };
    if (['Retired', 'InShop'].includes(vehicle.status)) throw { status: 400, message: 'Vehicle not valid for dispatch' };
    if (driver.status !== 'Available') throw { status: 400, message: 'Driver not available' };
    if (!checkLicenseValid(driver)) throw { status: 400, message: 'Driver license expired' };
    if (cargo_weight > (vehicle.max_capacity || Number.POSITIVE_INFINITY)) throw { status: 400, message: 'Cargo exceeds vehicle capacity' };

    const trip = createTrip({
      vehicle_id,
      driver_id,
      cargo_weight,
      origin,
      destination,
      status: 'Dispatched',
      start_odometer: vehicle.odometer || 0,
      created_at: new Date().toISOString(),
    });

    updateVehicle(vehicle_id, { status: 'OnTrip' });
    updateDriver(driver_id, { status: 'OnTrip' });

    return trip;
  });
}

export async function completeTripTransaction({ trip_id, end_odometer }) {
  const trip = findTripById(trip_id);
  if (!trip) throw { status: 404, message: 'Trip not found' };
  if (trip.status !== 'Dispatched') throw { status: 400, message: 'Trip not in dispatched state' };
  const vehicle_id = trip.vehicle_id;
  const driver_id = trip.driver_id;
  const lockIds = [`vehicle:${vehicle_id}`, `driver:${driver_id}`, `trip:${trip_id}`];

  return db.withLocks(lockIds, async () => {
    const vehicle = findVehicleById(vehicle_id);
    const driver = findDriverById(driver_id);
    if (!vehicle || !driver) throw { status: 404, message: 'Vehicle or driver not found' };
    if (end_odometer < trip.start_odometer) throw { status: 400, message: 'Invalid end odometer' };

    updateTrip(trip_id, { status: 'Completed', end_odometer, completed_at: new Date().toISOString() });
    updateVehicle(vehicle_id, { odometer: end_odometer, status: 'Available' });
    updateDriver(driver_id, { status: 'Available' });

    return findTripById(trip_id);
  });
}

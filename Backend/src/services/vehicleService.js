import { findByLicense, createVehicle, updateVehicle, findById } from '../repositories/vehiclesRepository.js';

export function createNewVehicle(payload) {
  const existing = findByLicense(payload.license_plate);
  if (existing) throw { status: 400, message: 'license_plate must be unique' };
  const v = {
    ...payload,
    status: 'Available',
    odometer: payload.odometer || 0,
  };
  return createVehicle(v);
}

export function retireVehicle(id) {
  const v = findById(id);
  if (!v) throw { status: 404, message: 'Vehicle not found' };
  if (v.status === 'OnTrip') throw { status: 400, message: 'Cannot retire a vehicle that is OnTrip' };
  return updateVehicle(id, { status: 'Retired' });
}

export function getVehicle(id) {
  return findById(id);
}

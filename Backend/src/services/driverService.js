import { findById, updateDriver, createDriver } from '../repositories/driversRepository.js';

export function createNewDriver(payload) {
  const d = { ...payload, status: 'Available' };
  return createDriver(d);
}

export function checkLicenseValid(driver) {
  const expiry = driver.license_expiry ? new Date(driver.license_expiry) : null;
  if (!expiry) return false;
  return expiry >= new Date();
}

export function getDriver(id) {
  return findById(id);
}

export function setDriverStatus(id, status) {
  return updateDriver(id, { status });
}

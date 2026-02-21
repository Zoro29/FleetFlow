import * as vehicleService from '../services/vehicleService.js';

export function createVehicle(req, res, next) {
  try {
    const v = vehicleService.createNewVehicle(req.body);
    res.status(201).json(v);
  } catch (err) {
    next(err);
  }
}

export function retireVehicle(req, res, next) {
  try {
    const v = vehicleService.retireVehicle(req.params.id);
    res.json(v);
  } catch (err) {
    next(err);
  }
}

export function getVehicle(req, res, next) {
  try {
    const v = vehicleService.getVehicle(req.params.id);
    if (!v) return res.status(404).json({ message: 'Not found' });
    res.json(v);
  } catch (err) {
    next(err);
  }
}

import * as tripService from '../services/tripService.js';

export async function createTrip(req, res, next) {
  try {
    const payload = req.body;
    const trip = await tripService.createTripTransaction(payload);
    res.status(201).json(trip);
  } catch (err) {
    next(err);
  }
}

export async function completeTrip(req, res, next) {
  try {
    const { trip_id } = req.params;
    const { end_odometer } = req.body;
    const trip = await tripService.completeTripTransaction({ trip_id, end_odometer });
    res.json(trip);
  } catch (err) {
    next(err);
  }
}

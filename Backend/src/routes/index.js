import express from 'express';
import * as authCtrl from '../controllers/authController.js';
import * as vehicleCtrl from '../controllers/vehicleController.js';
import * as tripCtrl from '../controllers/tripController.js';
import { authGuard } from '../middlewares/authGuard.js';
import { roleGuard } from '../middlewares/roleGuard.js';

const router = express.Router();

// Auth
router.post('/auth/register', authCtrl.register);
router.post('/auth/login', authCtrl.login);

// Vehicles
router.post('/vehicles', authGuard, roleGuard('Manager', 'Dispatcher'), vehicleCtrl.createVehicle);
router.post('/vehicles/:id/retire', authGuard, roleGuard('Manager'), vehicleCtrl.retireVehicle);
router.get('/vehicles/:id', authGuard, vehicleCtrl.getVehicle);

// Trips
router.post('/trips', authGuard, roleGuard('Dispatcher'), tripCtrl.createTrip);
router.post('/trips/:trip_id/complete', authGuard, roleGuard('Dispatcher', 'Driver'), tripCtrl.completeTrip);

export default router;

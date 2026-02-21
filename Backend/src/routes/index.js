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
router.post('/auth/check-email', authCtrl.checkEmail);

// Vehicles
router.post('/vehicles', authGuard, roleGuard('Fleet Manager', 'Dispatcher'), vehicleCtrl.createVehicle);
router.post('/vehicles/:id/retire', authGuard, roleGuard('Fleet Manager'), vehicleCtrl.retireVehicle);
router.get('/vehicles/:id', authGuard, vehicleCtrl.getVehicle);
router.get('/vehicles', authGuard, (await import('../controllers/listController.js')).getVehicles);

// Trips
router.post('/trips', authGuard, roleGuard('Dispatcher'), tripCtrl.createTrip);
router.post('/trips/:trip_id/complete', authGuard, roleGuard('Dispatcher', 'Driver'), tripCtrl.completeTrip);
router.get('/trips', authGuard, (await import('../controllers/listController.js')).getTrips);

// Drivers
router.get('/drivers', authGuard, (await import('../controllers/listController.js')).getDrivers);
// Public drivers list for quick local testing (no auth)
router.get('/public/drivers', (await import('../controllers/listController.js')).getDrivers);
// Public endpoints for other lists (no auth) to aid local testing
router.get('/public/vehicles', (await import('../controllers/listController.js')).getVehicles);
router.get('/public/trips', (await import('../controllers/listController.js')).getTrips);
router.get('/public/maintenance', (await import('../controllers/listController.js')).getMaintenance);
router.get('/public/expenses', (await import('../controllers/listController.js')).getExpenses);
router.post('/drivers', authGuard, (await import('../controllers/listController.js')).createDriver);

// Maintenance & Expenses
router.get('/maintenance', authGuard, (await import('../controllers/listController.js')).getMaintenance);
router.post('/maintenance', authGuard, (await import('../controllers/listController.js')).createMaintenance);
router.get('/expenses', authGuard, (await import('../controllers/listController.js')).getExpenses);
router.post('/expenses', authGuard, (await import('../controllers/listController.js')).createExpense);

export default router;

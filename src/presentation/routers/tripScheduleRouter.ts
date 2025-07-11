import express from 'express';
import { TripScheduleController } from '../controllers/tripScheduleController';

const router = express.Router();

const tripScheduleController = new TripScheduleController();

// Create Trip
router.post('/', async (req, res) => {
  await tripScheduleController.createTrip(req, res);
});

// Get Trips
router.get('/user/:userId', async (req, res) => {
  await tripScheduleController.getTripsByUserId(req, res);
});

// Get Trip
router.get('/:tripId', async (req, res) => {
  await tripScheduleController.getTripById(req, res);
});

// Update Trip
router.patch('/:tripId', async (req, res) => {
  await tripScheduleController.updateTripSchedule(req, res);
});

// Delete Trip
router.delete('/:tripId', async (req, res) => {
  await tripScheduleController.deleteTrip(req, res);
});

// Delete Trips
router.delete('/', async (req, res) => {
  await tripScheduleController.deleteTrips(req, res);
});

export default router;

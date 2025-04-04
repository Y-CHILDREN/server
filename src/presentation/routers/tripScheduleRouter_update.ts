import express from 'express';
import { TripScheduleController } from '../controllers/tripScheduleController_update';

const router = express.Router();

const tripScheduleController = new TripScheduleController();

// Create Trip
router.post('/', async (req, res) => {
  await tripScheduleController.createTrip(req, res);
});

// get Trips
router.get('/user/:userId', async (req, res) => {
  await tripScheduleController.getTripsByUserId(req, res);
});

export default router;

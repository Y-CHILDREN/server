import express from 'express';
import { TripScheduleController } from '../controllers/tripScheduleController';

const router = express.Router();

const tripScheduleController = new TripScheduleController();

// Create Trip
router.post('/create', (req, res) =>
  tripScheduleController.createTrip(req, res),
);

export default router;

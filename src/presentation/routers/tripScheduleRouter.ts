import express from 'express';
import { TripScheduleController } from '../controllers/tripScheduleController';

const router = express.Router();

const tripScheduleController = new TripScheduleController();

// Create Trip
router.post('/trips', (req, res) =>
  tripScheduleController.createTrip(req, res),
);

// Add member to trip
router.post('/trips/members', (req, res) =>
  tripScheduleController.addMemberByEmail(req, res),
);

// Get trip by id
router.get('/trips/:id', (req, res) =>
    tripScheduleController.getTripById(req, res)
);

export default router;

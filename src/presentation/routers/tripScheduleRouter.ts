import express from 'express';
import { TripScheduleController } from '../controllers/tripScheduleController';

const router = express.Router();

const tripScheduleController = new TripScheduleController();

// Create Trip
router.post('/', (req, res) => tripScheduleController.createTrip(req, res));

// Add member to trip
router.post('/members', (req, res) =>
  tripScheduleController.addMemberByEmail(req, res),
);

// delete trip
router.delete('/:id', (req, res) =>
  tripScheduleController.deleteTripById(req, res),
);

// Get trip by id
router.get('/:id', (req, res) => tripScheduleController.getTripById(req, res));

// Get trips by userId
router.get('/user/:userId', (req, res) =>
  tripScheduleController.getUserTrips(req, res),
);

// Update trip

export default router;

import { vi, describe, it, expect, beforeEach } from 'vitest';
import express from 'express';
import request from 'supertest';
import tripScheduleRouter from '../../../presentation/routers/tripScheduleRouter';

vi.mock('../../../presentation/controllers/tripScheduleController', () => {
  return {
    TripScheduleController: vi.fn().mockReturnValue({
      createTrip: vi.fn((req, res) => {
        console.log('req.body: ', req.body);
        res.status(201).json({ id: 1, ...req.body });
      }),
      addMemberByEmail: vi.fn((req, res) =>
        res.status(200).json({ message: 'Member added successfully' }),
      ),
      getTripById: vi.fn((req, res) => {
        if (req.params.id === '1') {
          return res.status(200).json({
            id: '1',
            name: 'Trip to Paris',
            start_date: '2024-01-01',
            end_date: '2024-01-05',
            members: ['user@example.com'],
            created_by: 'user@example.com',
          });
        } else {
          // id가 일치하지 않는 경우.
          return res.status(404).json({ message: 'Trip not found' });
        }
      }),
    }),
  };
});

const app = express();
app.use(express.json());
app.use('/trips', tripScheduleRouter);

describe('TripScheduleRouter', () => {
  beforeEach(() => {
    // mock init
    vi.clearAllMocks();
  });

  // Create Trip
  it('should handle POST requests to /trips', async () => {
    // // Given
    // const trip = {
    //   title: 'Trip to Paris',
    //   destination: 'domestic seoul',
    //   start_date: '2024-01-01',
    //   end_date: '2024-01-05',
    //   members: ['user@example.com'],
    //   created_by: 'user@example.com',
    // };
    //
    // // When
    // const response = await request(app).post('/trips').send(trip);
    // // Then
    // expect(response.status).toBe(201);
    // expect(response.body).toHaveProperty('id');
  });

  // Add member to trip
  it('should handle POST requests to /trips/members', async () => {
    // // Given
    // const member = {
    //   trip_id: 1,
    //   email: 'user@example.com',
    // };
    //
    // // When
    // const response = await request(app).post('/trips/members').send(member);
    //
    // // Then
    // expect(response.status).toBe(200);
    // expect(response.body).toHaveProperty(
    //   'message',
    //   'Member added successfully',
    // );
  });

  // Get trip by id
  it('should handle GET requests to /trips/:id', async () => {
    // // Given
    // const trip_id = 1;
    //
    // // When
    // const response = await request(app).get(`/trips/${trip_id}`);
    //
    // // Then
    // expect(response.status).toBe(200);
    // expect(response.body).toHaveProperty('name', 'Trip to Paris');
  });

  // Get trip by id when id is not found
  it('should handle GET requests to /trips/:id with non-existing id', async () => {
    // // Given
    // const trip_id = 3;
    //
    // // When
    // const response = await request(app).get(`/trips/${trip_id}`);
    //
    // // Then
    // expect(response.status).toBe(404);
    // expect(response.body).toHaveProperty('message', 'Trip not found');
  });
});

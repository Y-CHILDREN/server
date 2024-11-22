import { describe, it, expect, vi, beforeEach } from 'vitest';
import express, { Router } from 'express';
import request from 'supertest';
import { TripEventController } from '../../../presentation/controllers/tripEventController.js';
import { TripEventService } from '../../../domain/services/tripEventService.js';

describe('TripEventRoutes', () => {
  let app: express.Application;
  let mockTripEventController: TripEventController;
  let mockTripEventService: Partial<TripEventService>;

  beforeEach(() => {
    // Mock service methods
    mockTripEventService = {
      createTripEvent: vi.fn(),
      updateTripEvent: vi.fn(),
      getTripEventById: vi.fn(),
      deleteTripEventById: vi.fn(),
      getTripEventsByTripId: vi.fn(),
    };

    mockTripEventController = new TripEventController(
      mockTripEventService as TripEventService,
    );

    app = express();

    const router = Router();

    router.post('/', (req, res) =>
      mockTripEventController.createTripEvent(req, res),
    );
    router.put('/', (req, res) =>
      mockTripEventController.updateTripEvent(req, res),
    );
    router.get('/:event_id', (req, res) =>
      mockTripEventController.getTripEventById(req, res),
    );
    router.delete('/:event_id', (req, res) =>
      mockTripEventController.deleteTripEventById(req, res),
    );
    router.get('/trip/:trip_id', (req, res) =>
      mockTripEventController.getTripEventsByTripId(req, res),
    );

    app.use('/api/events', router);
  });

  describe('POST /', () => {
    it('should route to createTripEvent controller method', async () => {
      const mockEventData = {
        trip_id: 1,
        event_name: '테스트 이벤트',
        location: '서울',
        start_date: '2024-03-20T09:00:00Z',
        end_date: '2024-03-20T18:00:00Z',
        cost: [],
      };

      const mockResponse = {
        status: 201,
        data: { ...mockEventData, event_id: 1 },
      };

      vi.spyOn(mockTripEventController, 'createTripEvent').mockImplementation(
        async (req, res) => {
          res.status(201).json(mockResponse.data);
        },
      );

      const response = await request(app)
        .post('/api/events')
        .send(mockEventData);

      expect(response.status).toBe(201);
      expect(mockTripEventController.createTripEvent).toHaveBeenCalled();
    });
  });

  describe('PATCH /:event_id', () => {
    it('should route to updateTripEvent controller method', async () => {
      const mockUpdateData = {
        event_id: 1,
        trip_id: 1,
        event_name: '수정된 이벤트',
        location: '부산',
        start_date: '2024-03-20T09:00:00Z',
        end_date: '2024-03-20T18:00:00Z',
        cost: [],
      };

      const mockResponse = {
        status: 200,
        data: mockUpdateData,
      };

      vi.spyOn(mockTripEventController, 'updateTripEvent').mockImplementation(
        async (req, res) => {
          res.status(200).json(mockResponse.data);
        },
      );

      const response = await request(app)
        .put('/api/events')
        .send(mockUpdateData);

      expect(response.status).toBe(200);
      expect(mockTripEventController.updateTripEvent).toHaveBeenCalled();
    });
  });

  describe('GET /:event_id', () => {
    it('should route to getTripEventById controller method', async () => {
      const mockEvent = {
        event_id: 1,
        trip_id: 1,
        event_name: '테스트 이벤트',
        location: '서울',
        start_date: '2024-03-20T09:00:00Z',
        end_date: '2024-03-20T18:00:00Z',
        cost: [],
      };

      vi.spyOn(mockTripEventController, 'getTripEventById').mockImplementation(
        async (req, res) => {
          res.status(200).json(mockEvent);
        },
      );

      const response = await request(app).get('/api/events/1');

      expect(response.status).toBe(200);
      expect(mockTripEventController.getTripEventById).toHaveBeenCalled();
    });
  });

  describe('DELETE /:event_id', () => {
    it('should route to deleteTripEventById controller method', async () => {
      vi.spyOn(
        mockTripEventController,
        'deleteTripEventById',
      ).mockImplementation(async (req, res) => {
        res.status(204).send();
      });

      const response = await request(app).delete('/api/events/1');

      expect(response.status).toBe(204);
      expect(mockTripEventController.deleteTripEventById).toHaveBeenCalled();
    });
  });

  describe('GET /all/:trip_id', () => {
    it('should route to getTripEventsByTripId controller method', async () => {
      const mockEvents = [
        {
          event_id: 1,
          trip_id: 1,
          event_name: '테스트 이벤트1',
          location: '서울',
          start_date: '2024-03-20T09:00:00Z',
          end_date: '2024-03-20T18:00:00Z',
          cost: [],
        },
      ];

      vi.spyOn(
        mockTripEventController,
        'getTripEventsByTripId',
      ).mockImplementation(async (req, res) => {
        res.status(200).json(mockEvents);
      });

      const response = await request(app).get('/api/events/trip/1');

      expect(response.status).toBe(200);
      expect(mockTripEventController.getTripEventsByTripId).toHaveBeenCalled();
    });
  });

  describe('Route not found', () => {
    it('should return 404 for undefined routes', async () => {
      const response = await request(app).get('/api/events/undefined-route');

      expect(response.status).toBe(404);
    });
  });
});

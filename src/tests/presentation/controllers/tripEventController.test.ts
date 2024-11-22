import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Application, Request, Response } from 'express';

import { TripEventController } from '../../../presentation/controllers/tripEventController.js';
import { TripEventService } from '../../../domain/services/tripEventService.js';
import { TripEventDto } from '../../../data/dtos/event/tripEventDto.js';
import { TripEventConverter } from '../../../data/converters/tripEventConverter.js';
import { TripEvent } from '../../../domain/entities/tripEvent.js';
import { TripEventResponseDto } from '../../../data/dtos/event/tripEventResponseDto.js';

describe('TripEventController', () => {
  let tripEventService: TripEventService;
  let tripEventController: TripEventController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseJson: any;
  let responseStatus: any;
  let responseSend: any;

  beforeEach(() => {
    tripEventService = {
      createTripEvent: vi.fn(),
      updateTripEvent: vi.fn(),
      getTripEventById: vi.fn(),
      deleteTripEventById: vi.fn(),
      getTripEventsByTripId: vi.fn(),
    } as any;

    // Express app.get mock 설정
    const mockApp: Partial<Application> = {
      get: vi.fn().mockReturnValue(tripEventService),
    };

    tripEventController = new TripEventController(tripEventService);

    responseJson = vi.fn().mockReturnThis();
    responseStatus = vi.fn().mockReturnThis();
    responseSend = vi.fn().mockReturnThis();

    mockResponse = {
      json: responseJson,
      status: responseStatus,
      send: responseSend,
    };

    // Request 객체에 app 속성 추가
    mockRequest = {
      app: mockApp,
    } as Request;
  });

  describe('createTripEvent', () => {
    const mockTripEventDto: TripEventDto = {
      trip_id: 1,
      event_id: 1,
      event_name: '테스트 이벤트1',
      location: '서울',
      start_date: new Date('2024-03-20T09:00:00Z'),
      end_date: new Date('2024-03-20T18:00:00Z'),
      cost: [
        {
          category: '입장료',
          value: 60000,
        },
        {
          category: '식비',
          value: 40000,
        },
      ],
    };

    it('should create a trip event successfully', async () => {
      mockRequest = {
        ...mockRequest,
        body: mockTripEventDto,
      };

      const mockCreatedEvent = { ...mockTripEventDto };
      const mockResponseDto = {
        ...mockCreatedEvent,
        start_date: mockCreatedEvent.start_date.toISOString(),
        end_date: mockCreatedEvent.end_date.toISOString(),
      };
      vi.spyOn(tripEventService, 'createTripEvent').mockResolvedValue(
        mockCreatedEvent,
      );
      vi.spyOn(TripEventConverter, 'fromRequestDto').mockReturnValue(
        mockCreatedEvent,
      );
      vi.spyOn(TripEventConverter, 'toResponseDto').mockReturnValue(
        mockResponseDto,
      );

      await tripEventController.createTripEvent(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(responseStatus).toHaveBeenCalledWith(201);
      expect(responseJson).toHaveBeenCalledWith({
        ...mockTripEventDto,
        start_date: mockTripEventDto.start_date.toISOString(),
        end_date: mockTripEventDto.end_date.toISOString(),
      });

      expect(tripEventService.createTripEvent).toHaveBeenCalled();
    });

    it('should handle errors during trip event creation', async () => {
      mockRequest = {
        ...mockRequest,
        body: mockTripEventDto,
      };

      const error = new Error('Creation failed');
      vi.spyOn(tripEventService, 'createTripEvent').mockRejectedValue(error);

      await tripEventController.createTripEvent(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(responseStatus).toHaveBeenCalledWith(400);
      expect(responseJson).toHaveBeenCalledWith({ message: error.message });
    });
  });

  describe('updateTripEvent', () => {
    const mockTripEventDto: TripEventDto = {
      trip_id: 1,
      event_id: 1,
      event_name: '테스트 이벤트2',
      location: '부산',
      start_date: new Date('2024-03-20T09:00:00Z'),
      end_date: new Date('2024-03-20T18:00:00Z'),
      cost: [
        {
          category: '입장료',
          value: 50000,
        },
        {
          category: '식비',
          value: 30000,
        },
      ],
    };

    it('should update a trip event successfully', async () => {
      mockRequest = {
        ...mockRequest,
        body: mockTripEventDto,
        params: { event_id: '1' },
      };

      const mockUpdatedEvent = { ...mockTripEventDto };
      const mockResponseDto = {
        ...mockUpdatedEvent,
        start_date: mockUpdatedEvent.start_date.toISOString(),
        end_date: mockUpdatedEvent.end_date.toISOString(),
      };
      vi.spyOn(tripEventService, 'updateTripEvent').mockResolvedValue(
        mockUpdatedEvent,
      );
      vi.spyOn(TripEventConverter, 'fromRequestDto').mockReturnValue(
        mockUpdatedEvent,
      );
      vi.spyOn(TripEventConverter, 'toResponseDto').mockReturnValue(
        mockResponseDto,
      );

      await tripEventController.updateTripEvent(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(responseStatus).toHaveBeenCalledWith(200);
      expect(responseJson).toHaveBeenCalledWith({
        ...mockTripEventDto,
        start_date: mockTripEventDto.start_date.toISOString(),
        end_date: mockTripEventDto.end_date.toISOString(),
      });
    });

    it('should handle errors during trip event update', async () => {
      mockRequest = {
        ...mockRequest,
        body: mockTripEventDto,
        params: { event_id: '1' },
      };

      const error = new Error('Update failed');
      vi.spyOn(tripEventService, 'updateTripEvent').mockRejectedValue(error);

      await tripEventController.updateTripEvent(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(responseStatus).toHaveBeenCalledWith(400);
      expect(responseJson).toHaveBeenCalledWith({ message: error.message });
    });
  });

  describe('getTripEventById', () => {
    it('should get a trip event by id successfully', async () => {
      mockRequest = {
        ...mockRequest,
        params: { event_id: '1' },
      };

      const mockEvent: TripEvent = {
        trip_id: 1,
        event_id: 1,
        event_name: '테스트 이벤트2',
        location: '부산',
        start_date: new Date('2024-03-20T09:00:00Z'),
        end_date: new Date('2024-03-20T18:00:00Z'),
        cost: [
          {
            category: '입장료',
            value: 50000,
          },
          {
            category: '식비',
            value: 30000,
          },
        ],
      };

      const mockTripEventDto: TripEventResponseDto = {
        ...mockEvent,
        start_date: mockEvent.start_date.toISOString(),
        end_date: mockEvent.end_date.toISOString(),
      };

      vi.spyOn(tripEventService, 'getTripEventById').mockResolvedValue(
        mockEvent,
      );
      vi.spyOn(TripEventConverter, 'toResponseDto').mockReturnValue(
        mockTripEventDto,
      );

      await tripEventController.getTripEventById(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(responseStatus).toHaveBeenCalledWith(200);
      expect(responseJson).toHaveBeenCalledWith(mockTripEventDto);
    });

    it('should handle event not found', async () => {
      mockRequest = {
        ...mockRequest,
        params: { event_id: '999' },
      };

      const error = new Error('Event not found');
      vi.spyOn(tripEventService, 'getTripEventById').mockRejectedValue(error);

      await tripEventController.getTripEventById(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(responseStatus).toHaveBeenCalledWith(404);
      expect(responseJson).toHaveBeenCalledWith({ message: error.message });
    });
  });

  describe('deleteTripEventById', () => {
    it('should delete a trip event successfully', async () => {
      mockRequest = {
        ...mockRequest,
        params: { event_id: '1' },
      };

      vi.spyOn(tripEventService, 'deleteTripEventById').mockResolvedValue(true);

      await tripEventController.deleteTripEventById(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(responseStatus).toHaveBeenCalledWith(204);
      expect(responseSend).toHaveBeenCalled();
    });

    it('should handle delete event not found', async () => {
      mockRequest = {
        ...mockRequest,
        params: { event_id: '999' },
      };

      const error = new Error('Event not found');
      vi.spyOn(tripEventService, 'deleteTripEventById').mockRejectedValue(
        error,
      );

      await tripEventController.deleteTripEventById(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(responseStatus).toHaveBeenCalledWith(404);
      expect(responseJson).toHaveBeenCalledWith({ message: error.message });
    });
  });

  describe('getTripEventsByTripId', () => {
    it('should get all trip events by trip id successfully', async () => {
      mockRequest = {
        ...mockRequest,
        params: { trip_id: '1' },
      };

      const mockEvents: TripEvent[] = [
        {
          trip_id: 1,
          event_id: 1,
          event_name: '테스트 이벤트1',
          location: '부산',
          start_date: new Date('2024-01-01T09:00:00Z'),
          end_date: new Date('2024-01-01T18:00:00Z'),
          cost: [
            {
              category: '입장료',
              value: 50000,
            },
            {
              category: '식비',
              value: 30000,
            },
          ],
        },
        {
          trip_id: 1,
          event_id: 2,
          event_name: '테스트 이벤트2',
          location: '서울',
          start_date: new Date('2024-03-20T09:00:00Z'),
          end_date: new Date('2024-03-20T18:00:00Z'),
          cost: [
            {
              category: '입장료',
              value: 50000,
            },
            {
              category: '식비',
              value: 30000,
            },
          ],
        },
      ];

      const mockEventDtos = mockEvents.map((event) => ({
        ...event,
        start_date: event.start_date.toISOString(),
        end_date: event.end_date.toISOString(),
      }));

      vi.spyOn(tripEventService, 'getTripEventsByTripId').mockResolvedValue(
        mockEvents,
      );
      vi.spyOn(TripEventConverter, 'toResponseDto').mockImplementation(
        (event) => ({
          ...event,
          start_date: event.start_date.toISOString(),
          end_date: event.end_date.toISOString(),
        }),
      );

      await tripEventController.getTripEventsByTripId(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(responseStatus).toHaveBeenCalledWith(200);
      expect(responseJson).toHaveBeenCalledWith(mockEventDtos);
    });

    it('should handle trip not found', async () => {
      mockRequest = {
        ...mockRequest,
        params: { trip_id: '999' },
      };

      const error = new Error('Trip not found');
      vi.spyOn(tripEventService, 'getTripEventsByTripId').mockRejectedValue(
        error,
      );

      await tripEventController.getTripEventsByTripId(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(responseStatus).toHaveBeenCalledWith(404);
      expect(responseJson).toHaveBeenCalledWith({ message: error.message });
    });
  });
});

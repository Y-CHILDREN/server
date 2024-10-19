import { describe, vi, it, beforeEach, expect } from 'vitest';
import { Request, Response } from 'express';
import { TripScheduleController } from '../../../presentation/controllers/tripScheduleController';
import { TripScheduleConverter } from '../../../data/converters/tripScheduleConverter';

const mockTripScheduleService = {
  createTripSchedule: vi.fn(),
  addMemberByEmail: vi.fn(),
  getTripById: vi.fn(),
};

const mockRequest = (body = {}, params = {}) =>
  ({
    body,
    params,
    app: {
      get: vi.fn().mockReturnValue(mockTripScheduleService),
    },
  }) as unknown as Request;

const mockResponse = () => {
  const res: any = {};
  res.status = vi.fn().mockReturnThis();
  res.json = vi.fn().mockReturnThis();
  res.send = vi.fn().mockReturnThis();
  return res as Response;
};

describe('TripScheduleController', () => {
  let controller: TripScheduleController;

  beforeEach(() => {
    controller = new TripScheduleController();
    vi.resetAllMocks();
  });

  it('should create a trip successfully', async () => {
    // Given
    const req = mockRequest({
      name: 'Trip to Paris',
      start_date: '2023-01-01',
      end_date: '2023-01-05',
      members: ['user@example.com'],
    });
    const res = mockResponse();

    mockTripScheduleService.createTripSchedule.mockResolvedValue({
      id: 1,
      ...req.body,
      start_date: new Date(req.body.start_date),
      end_date: new Date(req.body.end_date),
    });

    // When
    await controller.createTrip(req, res);

    // Then
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      id: 1,
      name: 'Trip to Paris',
      start_date: new Date('2023-01-01').toISOString(),
      end_date: new Date('2023-01-05').toISOString(),
      members: ['user@example.com'],
    });
  });

  it('should  add member successfully', async () => {
    // Given
    const req = mockRequest({
      trip_id: 1,
      email: 'example@example.com',
    });
    const res = mockResponse();

    // When
    await controller.addMemberByEmail(req, res);

    // Then
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Member added successfully',
    });
  });

  it('should retrieve a trip by ID', async () => {
    // Given
    const req = mockRequest({}, { id: '1' });
    const res = mockResponse();
    const trip = {
      id: 1,
      name: 'Trip to Paris',
      members: ['user@example.com'],
      start_date: new Date('2023-01-01'),
      end_date: new Date('2023-01-05'),
    };

    mockTripScheduleService.getTripById.mockResolvedValue(trip);
    TripScheduleConverter.toResDto = vi.fn().mockReturnValue({
      id: 1,
      name: 'Trip to Paris',
      members: ['user@example.com'],
      startDate: '2023-01-01T00:00:00.000Z',
      endDate: '2023-01-05T00:00:00.000Z',
    });

    // When
    await controller.getTripById(req, res);

    // Then
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      id: 1,
      name: 'Trip to Paris',
      members: ['user@example.com'],
      startDate: '2023-01-01T00:00:00.000Z',
      endDate: '2023-01-05T00:00:00.000Z',
    });
  });

  it('should return 404 if the trip is not found', async () => {
    // Given
    const req = mockRequest({}, { id: '99' });
    const res = mockResponse();

    mockTripScheduleService.getTripById.mockResolvedValue(null);

    // When
    await controller.getTripById(req, res);

    // Then
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Trip not found',
    });
  });
});

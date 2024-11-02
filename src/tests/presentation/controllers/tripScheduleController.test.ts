import { describe, vi, it, beforeEach, expect } from 'vitest';
import { Request, Response } from 'express';

import { TripScheduleController } from '../../../presentation/controllers/tripScheduleController';
import { TripScheduleConverter } from '../../../data/converters/tripScheduleConverter';
import { TripSchedule } from '../../../domain/entities/tripSchedule';

// vi.mock('../../../data/converters/tripScheduleConverter', () => ({
//   TripScheduleConverter: {
//     toResDto: vi.fn(),
//   },
// }));
vi.mock('../../../data/converters/tripScheduleConverter');

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
    user: {
      id: '1',
      provider: 'google',
      email: 'user@example.com',
      user_image: 'http://example.com/image.png',
      nickname: 'User',
      user_memo: 'Sample user for demonstration.',
      access_token: 'some_access_token',
      refresh_token: 'some_refresh_token',
      trip_history: [],
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

  it('should create a trip successfully and return a formatted response', async () => {
    // Given
    const req = mockRequest({
      name: 'Trip to Paris',
      start_date: '2023-01-01',
      end_date: '2023-01-05',
      members: ['user@example.com'],
    });
    const res = mockResponse();
    const tripData: TripSchedule = {
      id: 1,
      name: 'Trip to Paris',
      start_date: new Date('2023-01-01'),
      end_date: new Date('2023-01-05'),
      members: ['user@example.com'],
      created_by: 'user@example.com',
    };

    // toResDto Mocking
    // TripScheduleConverter.toResDto.mockReturnValue({
    //   id: 1,
    //   name: 'Trip to Paris',
    //   start_date: new Date('2023-01-01'),
    //   end_date: new Date('2023-01-05'),
    //   members: ['user@example.com'],
    //   created_by: 'user@example.com',
    // });
    const expectedDto = {
      id: tripData.id,
      name: tripData.name,
      start_date: tripData.start_date.toISOString(),
      end_date: tripData.end_date.toISOString(),
      members: tripData.members,
      created_by: tripData.created_by,
    };

    mockTripScheduleService.createTripSchedule.mockResolvedValue(tripData);
    TripScheduleConverter.toResDto = vi.fn(() => expectedDto);

    // When
    await controller.createTrip(req, res);

    // Then
    expect(mockTripScheduleService.createTripSchedule).toHaveBeenCalledWith({
      ...req.body,
      created_by: 'user@example.com',
    });
    expect(TripScheduleConverter.toResDto).toHaveBeenCalledWith(tripData);
    expect(res.status).toHaveBeenCalledWith(201);
    // expect(res.json).toHaveBeenCalledWith({
    //   id: 1,
    //   name: 'Trip to Paris',
    //   start_date: new Date('2023-01-01').toISOString(),
    //   end_date: new Date('2023-01-05').toISOString(),
    //   members: ['user@example.com'],
    //   created_by: 'user@example.com',
    // });
    TripScheduleConverter.toResDto = vi.fn(() => expectedDto);
  });

  it('should handle errors when the service throws an exception', async () => {
    // Given
    const req = mockRequest({
      name: 'Trip to Paris',
      start_date: '2023-01-05',
      end_date: '2023-01-01',
      members: ['user@example.com'],
    });
    const res = mockResponse();
    const error = new Error(
      'Invalid date range: startDate must be before endDate.',
    );
    mockTripScheduleService.createTripSchedule.mockRejectedValue(error);

    // When
    await controller.createTrip(req, res);

    // Then
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Server error' });
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
      created_by: 'user@example.com',
    };

    mockTripScheduleService.getTripById.mockResolvedValue(trip);
    TripScheduleConverter.toResDto = vi.fn().mockReturnValue({
      id: 1,
      name: 'Trip to Paris',
      members: ['user@example.com'],
      startDate: '2023-01-01T00:00:00.000Z',
      endDate: '2023-01-05T00:00:00.000Z',
      created_by: 'user@example.com',
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
      created_by: 'user@example.com',
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

import { beforeEach, describe, expect, test, vi } from 'vitest';
import { TripSchedule } from '../../../domain/entities/tripSchedule';
import { User } from '../../../domain/models/user';
import { TripScheduleService } from '../../../domain/services/tripScheduleService';
import { TripScheduleRepository } from '../../../domain/repositories/tripScheduleRepository';
import { UserRepository } from '../../../domain/repositories/userRepository';

describe('TripScheduleService', () => {
  let tripRepository: TripScheduleRepository;
  let userRepository: UserRepository;
  let tripService: TripScheduleService;

  beforeEach(() => {
    // Repository의 mock 설정
    tripRepository = {
      create: vi.fn(),
      update: vi.fn(),
      deleteById: vi.fn(),
      findTripById: vi.fn(),
    } as unknown as TripScheduleRepository;

    userRepository = {
      findUserByEmail: vi.fn(),
      updateUserTripHistory: vi.fn(),
    } as unknown as UserRepository;
    tripService = new TripScheduleService(tripRepository, userRepository);
    vi.restoreAllMocks();
  });

  it('should throw an error if start_date is after end_date', async () => {
    const invalidData: Omit<TripSchedule, 'id'> = {
      name: 'Test Trip',
      destination: 'Test Destination',
      start_date: new Date('2024-12-10'),
      end_date: new Date('2024-12-01'),
      members: [],
      created_by: 'user@example.com',
    };

    await expect(tripService.createTripSchedule(invalidData)).rejects.toThrow(
      'Invalid date range: startDate must be before endDate.',
    );
  });

  it('should throw an error if user is not found', async () => {
    const validData: Omit<TripSchedule, 'id'> = {
      name: 'Test Trip',
      destination: 'Test Destination',
      start_date: new Date('2024-12-01'),
      end_date: new Date('2024-12-10'),
      members: [],
      created_by: 'user@example.com',
    };

    vi.spyOn(userRepository, 'findUserByEmail').mockResolvedValue(undefined);

    await expect(tripService.createTripSchedule(validData)).rejects.toThrow(
      'User not found',
    );
  });

  it('should throw an error if updating user trip history fails', async () => {
    const validData: Omit<TripSchedule, 'id'> = {
      name: 'Test Trip',
      destination: 'Test Destination',
      start_date: new Date('2024-12-01'),
      end_date: new Date('2024-12-10'),
      members: [],
      created_by: 'user@example.com',
    };

    const mockTrip = {
      id: 1,
      ...validData,
    };

    vi.spyOn(tripRepository, 'create').mockResolvedValue(mockTrip);
    vi.spyOn(userRepository, 'findUserByEmail').mockResolvedValue({
      id: 'user123',
      provider: 'local',
      email: 'user@example.com',
      user_image: 'image.png',
      nickname: 'user',
      user_memo: 'Test user',
      access_token: 'access_token',
      refresh_token: 'refresh_token',
      trip_history: [],
    });

    vi.spyOn(userRepository, 'updateUserTripHistory').mockResolvedValue(false);

    await expect(tripService.createTripSchedule(validData)).rejects.toThrow(
      'Failed to update user trip history',
    );
  });

  it('should create a trip successfully when all validations pass', async () => {
    const validData: Omit<TripSchedule, 'id'> = {
      name: 'Test Trip',
      destination: 'Test Destination',
      start_date: new Date('2024-12-01'),
      end_date: new Date('2024-12-10'),
      members: [],
      created_by: 'user@example.com',
    };

    const mockUser = {
      id: 'user123',
      provider: 'local',
      email: 'user@example.com',
      user_image: 'image.png',
      nickname: 'user',
      user_memo: 'Test user',
      access_token: 'access_token',
      refresh_token: 'refresh_token',
      trip_history: [],
    };

    const mockTrip = {
      id: 1,
      ...validData,
    };

    vi.spyOn(userRepository, 'findUserByEmail').mockResolvedValue(mockUser);
    vi.spyOn(userRepository, 'updateUserTripHistory').mockResolvedValue(true);
    vi.spyOn(tripRepository, 'create').mockResolvedValue(mockTrip);

    const result = await tripService.createTripSchedule(validData);

    expect(result).toEqual(mockTrip);
    expect(userRepository.updateUserTripHistory).toHaveBeenCalledWith(
      mockUser.id,
      mockTrip.id,
    );
  });

  test('should add a member by email', async () => {
    // Given
    const email = 'Park@gmail.com';
    vi.spyOn(userRepository, 'findUserByEmail').mockResolvedValue({
      id: '1',
      provider: 'google',
      email,
      user_image: 'test.webp',
      nickname: 'JiHwan',
      user_memo: 'hello world!',
      access_token: 'access_token_value',
      refresh_token: 'refresh_token_value',
      trip_history: [1, 2, 3],
    });

    await tripRepository.create({
      name: 'first trip',
      destination: 'domestic seoul',
      start_date: new Date('2024-12-01'),
      end_date: new Date('2024-12-10'),
      members: ['Hwang@naver.com'],
      created_by: 'Hwang@naver.com',
    });

    // When
    await tripService.addTripMemberByEmail(1, email);
    const updatedTrip = await tripService.getTripById(1);

    // Then
    console.log('Updated Trip add a member:', updatedTrip);
    expect(updatedTrip?.members).toContain(email);
  });

  test('should throw an error if user email is not found when adding for member', async () => {
    // Given
    const email = 'nonexist@example.com';
    vi.spyOn(userRepository, 'findUserByEmail').mockResolvedValue(undefined); // no exist user by email return null.

    // When
    const actual = tripService.addTripMemberByEmail(1, email);

    // Then
    await expect(actual).rejects.toThrowError('User(email) not found');
  });

  test('should throw an error if trip id is not found when adding a member', async () => {
    // Given
    const email = 'user@example.com';
    vi.spyOn(userRepository, 'findUserByEmail').mockResolvedValue({
      id: '3',
      provider: 'google',
      email,
      user_image: 'test.webp',
      nickname: 'TeaJung',
      user_memo: 'hello world!',
      access_token: 'access_token_value',
      refresh_token: 'refresh_token_value',
      trip_history: [1, 3],
    });
    vi.spyOn(tripRepository, 'findTripById').mockResolvedValue(null);

    // When
    const actual = tripService.addTripMemberByEmail(1, email);

    //Then
    await expect(actual).rejects.toThrow('Trip(Id) not found');
  });

  test('should throw an error if user is already a member of the trip', async () => {
    // Given
    const email = 'user@example.com';
    const tripId = 1;
    const trip = {
      id: tripId,
      name: 'Family Trip',
      destination: 'domestic seoul',
      start_date: new Date(),
      end_date: new Date(),
      members: [email],
      created_by: email,
    };

    vi.spyOn(userRepository, 'findUserByEmail').mockResolvedValue({
      id: '2',
      provider: 'google',
      email,
      user_image: 'test.webp',
      nickname: 'silverStone',
      user_memo: 'hello world!',
      access_token: 'access_token_value',
      refresh_token: 'refresh_token_value',
      trip_history: [2, 3],
    });
    vi.spyOn(tripRepository, 'findTripById').mockResolvedValue(trip);

    // When
    const actual = tripService.addTripMemberByEmail(tripId, email);

    // Then
    await expect(actual).rejects.toThrow(
      'User is already a member of the trip',
    );
  });

  test('should add a new member to the trip', async () => {
    // Given
    const email = 'Park@example.com';
    const tripId = 1;
    const trip = {
      id: tripId,
      name: 'Family Trip',
      destination: 'domestic seoul',
      start_date: new Date(),
      end_date: new Date(),
      members: ['Hwang@example.com'],
      created_by: 'Hwang@example.com',
    };

    vi.spyOn(userRepository, 'findUserByEmail').mockResolvedValue({
      id: '2',
      provider: 'google',
      email,
      user_image: 'test.webp',
      nickname: 'JiHwan',
      user_memo: 'hello world!',
      access_token: 'access_token_value',
      refresh_token: 'refresh_token_value',
      trip_history: [1, 2, 3],
    });
    vi.spyOn(tripRepository, 'findTripById').mockResolvedValue(trip);
    vi.spyOn(tripRepository, 'update').mockResolvedValue();

    // When
    await tripService.addTripMemberByEmail(tripId, email);
    const updatedTrip = await tripRepository.findTripById(tripId);

    // Then
    console.log('updatedTrip', updatedTrip);
    expect(updatedTrip?.members).toContain(email);
  });

  test('should delete a trip by id successfully', async () => {
    // Given
    const tripId = 1;
    const trip = {
      id: tripId,
      name: 'Family Trip',
      destination: 'domestic seoul',
      start_date: new Date(),
      end_date: new Date(),
      members: ['Hwang@example.com'],
      created_by: 'Hwang@example.com',
    };

    // When
    await tripService.deleteTripById(tripId);

    // Then
    expect(tripRepository.deleteById).toHaveBeenCalledWith(tripId);
    expect(trip).toEqual(null);
  });
});

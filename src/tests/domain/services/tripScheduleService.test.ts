import { beforeEach, describe, expect, test, vi } from 'vitest';
import { TripSchedule } from '../../../domain/entities/tripSchedule';
import { InMemoryTripScheduleRepositoryImpl } from '../../../data/repositoryImpls/inMemoryTripScheduleRepositoryImpl';
import { TripScheduleService } from '../../../domain/services/tripScheduleService';
import { InMemoryUserRepositoryImpl } from '../../../data/repositoryImpls/inMemoryUserRepositoryImpl';
import { CreateTripDto } from '../../../data/dtos/trip/createTripDto';

describe('TripScheduleService', () => {
  let tripRepository: InMemoryTripScheduleRepositoryImpl;
  let userRepository: InMemoryUserRepositoryImpl;
  let tripService: TripScheduleService;

  beforeEach(() => {
    tripRepository = new InMemoryTripScheduleRepositoryImpl();
    userRepository = new InMemoryUserRepositoryImpl();
    tripService = new TripScheduleService(tripRepository, userRepository);
    vi.restoreAllMocks();
  });

  test('should create a trip', async () => {
    // Given
    const tripSchedule: CreateTripDto = {
      name: 'first trip',
      start_date: '2024-12-01',
      end_date: '2024-12-10',
      members: ['Hwang@naver.com'],
      created_by: 'Hwang@naver.com',
    };

    vi.spyOn(tripRepository, 'create').mockResolvedValue({
      id: 1,
      ...tripSchedule,
      start_date: new Date(tripSchedule.start_date),
      end_date: new Date(tripSchedule.end_date),
    });

    // When
    const createdTrip = await tripService.createTripSchedule(tripSchedule);
    console.log('Created Trip:', createdTrip);

    // Then
    expect(createdTrip).toEqual(
      expect.objectContaining({
        name: tripSchedule.name,
        start_date: expect.any(Date),
        end_date: expect.any(Date),
        members: expect.arrayContaining(tripSchedule.members),
        created_by: tripSchedule.created_by,
      }),
    );
  });

  test('should add a member by email', async () => {
    // Given
    const email = 'Park@gmail.com';
    vi.spyOn(userRepository, 'findByEmail').mockResolvedValue({
      id: 2,
      email,
      name: 'JiHwan',
      tripSchedule: [1, 2],
      createdAt: new Date('2024-12-01'),
      updatedAt: new Date('2024-12-02'),
    });

    await tripRepository.create({
      name: 'first trip',
      start_date: new Date('2024-12-01'),
      end_date: new Date('2024-12-10'),
      members: ['Hwang@naver.com'],
      created_by: 'Hwang@naver.com',
    });

    // When
    await tripService.addMemberByEmail(1, email);
    const updatedTrip = await tripRepository.findTripById(1);

    // Then
    console.log('Updated Trip add a member:', updatedTrip);
    expect(updatedTrip?.members).toContain(email);
  });

  test('should throw an error if user email is not found when adding for member', async () => {
    // Given
    const email = 'nonexist@example.com';
    vi.spyOn(userRepository, 'findByEmail').mockResolvedValue(null); // no exist user by email return null.

    // When
    const actual = tripService.addMemberByEmail(1, email);

    // Then
    await expect(actual).rejects.toThrowError('User(email) not found');
  });

  test('should throw an error if trip id is not found when adding a member', async () => {
    // Given
    const email = 'user@example.com';
    vi.spyOn(userRepository, 'findByEmail').mockResolvedValue({
      id: 3,
      email,
      name: 'TaeJung',
      tripSchedule: [1, 2],
      createdAt: new Date('2024-12-01'),
      updatedAt: new Date('2024-12-02'),
    });
    vi.spyOn(tripRepository, 'findTripById').mockResolvedValue(null);

    // When
    const actual = tripService.addMemberByEmail(1, email);

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
      start_date: new Date(),
      end_date: new Date(),
      members: [email],
      created_by: email,
    };

    vi.spyOn(userRepository, 'findByEmail').mockResolvedValue({
      id: 3,
      email,
      name: 'TaeJung',
      tripSchedule: [1, 2],
      createdAt: new Date('2024-12-01'),
      updatedAt: new Date('2024-12-02'),
    });
    vi.spyOn(tripRepository, 'findTripById').mockResolvedValue(trip);

    // When
    const actual = tripService.addMemberByEmail(tripId, email);

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
      start_date: new Date(),
      end_date: new Date(),
      members: ['Hwang@example.com'],
      created_by: 'Hwang@example.com',
    };

    vi.spyOn(userRepository, 'findByEmail').mockResolvedValue({
      id: 3,
      email,
      name: 'JiHwan',
      tripSchedule: [1, 2],
      createdAt: new Date('2024-12-01'),
      updatedAt: new Date('2024-12-02'),
    });
    vi.spyOn(tripRepository, 'findTripById').mockResolvedValue(trip);
    vi.spyOn(tripRepository, 'update').mockResolvedValue();

    // When
    await tripService.addMemberByEmail(tripId, email);
    const updatedTrip = await tripRepository.findTripById(tripId);

    // Then
    console.log('updatedTrip', updatedTrip);
    expect(updatedTrip?.members).toContain(email);
  });
});

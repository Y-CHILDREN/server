import { describe, expect, test, vi } from 'vitest';
import { TripSchedule } from '../../../domain/entities/tripSchedule';
import { InMemoryTripScheduleRepositoryImpl } from '../../../data/repositoryImpls/inMemoryTripScheduleRepositoryImpl';
import { TripScheduleService } from '../../../domain/services/tripScheduleService';
import { InMemoryUserRepositoryImpl } from '../../../data/repositoryImpls/inMemoryUserRepositoryImpl';

describe('TripScheduleService', () => {
  const tripRepository = new InMemoryTripScheduleRepositoryImpl();
  const userRepository = new InMemoryUserRepositoryImpl();
  const tripService = new TripScheduleService(tripRepository, userRepository);

  test('should create a trip', async () => {
    // Given
    const tripSchedule: TripSchedule = {
      id: 1,
      name: 'first trip',
      start_date: new Date('2024-12-01'),
      end_date: new Date('2024-12-10'),
      members: ['Hwang@naver.com'],
      created_by: 'Hwang@naver.com',
    };

    // When
    const createdTrip = await tripService.createTripSchedule(tripSchedule);

    // Then
    expect(createdTrip).toEqual(tripSchedule);
  });

  test('should add a member by email', async () => {
    // Given
    const trip: TripSchedule = {
      id: 1,
      name: 'first trip',
      start_date: new Date('2024-12-01'),
      end_date: new Date('2024-12-10'),
      members: ['Hwang@naver.com'],
      created_by: 'Hwang@naver.com',
    };

    // When
    // await tripService.createTripSchedule(trip);
    await tripService.addMemberByEmail(1, 'Park@gmail.com');
    const updatedTrip = await tripRepository.findTripById(1);

    // Then
    expect(updatedTrip?.members).toContain('Park@gmail.com');
  });

  test('should throw an error if user email is not found when adding for member', async () => {
    // Given
    vi.spyOn(userRepository, 'findByEmail').mockResolvedValue(null); // no exist user by email return null.

    // When
    const actual = tripService.addMemberByEmail(1, 'nonexist@example.com');

    // Then
    await expect(actual).rejects.toThrowError('User(email) not found');
  });
});

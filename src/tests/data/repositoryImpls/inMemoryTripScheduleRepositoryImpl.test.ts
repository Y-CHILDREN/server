import { describe, expect, test } from 'vitest';
// import { InMemoryTripScheduleRepositoryImpl } from '../../../data/repositoryImpls/inMemoryTripScheduleRepositoryImpl';
// import { TripSchedule } from '../../../domain/entities/tripSchedule';

describe('ImMemoryTripScheduleRepositoryImpl', () => {
  // const repository = new InMemoryTripScheduleRepositoryImpl();

  test('should create a new trip', async () => {
    // // Given
    // const trip: TripSchedule = {
    //   id: 1,
    //   name: 'first trip',
    //   destination: 'domestic seoul',
    //   start_date: new Date('2024-12-01'),
    //   end_date: new Date('2024-12-10'),
    //   members: ['Hwang@naver.com'],
    //   created_by: 'user@example.com',
    // };
    //
    // // When
    // const createdTrip = await repository.create(trip);
    //
    // // Then
    // expect(createdTrip).toEqual(trip);
  });

  test('should update an existing trip', async () => {
    // // Given
    // const trip: TripSchedule = {
    //   id: 1,
    //   name: 'first trip',
    //   destination: 'domestic seoul',
    //   start_date: new Date('2024-12-01'),
    //   end_date: new Date('2024-12-10'),
    //   members: ['Hwang@naver.com'],
    //   created_by: 'user@example.com',
    // };
    //
    // // When
    // // create
    // await repository.create(trip);
    //
    // // update
    // trip.members.push('Jihwan@naver.com');
    // await repository.update(trip);
    //
    // const updatedTrip = await repository.findTripById(1);
    //
    // // Then
    // expect(updatedTrip?.members).toContain('Jihwan@naver.com'); // Optional Chaining(?.)
  });
});

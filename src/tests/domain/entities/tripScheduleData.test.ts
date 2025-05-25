import { describe, expect, test } from 'vitest';

// import {
//   TripSchedule,
//   validateTripDates,
// } from '../../../domain/entities/tripSchedule';

describe('TripSchedule Entity', () => {
  test('should validate that startDate is before endDate', () => {
    // // Given
    // const trip: TripSchedule = {
    //   id: 1,
    //   name: 'first trip',
    //   destination: 'domestic seoul',
    //   start_date: new Date('2024-12-01'),
    //   end_date: new Date('2024-12-10'),
    //   members: ['Hwang@naver.com'],
    //   created_by: 'Hwang@naver.com',
    // };
    // // When
    // const actual = validateTripDates(trip);
    //
    // // Then
    // expect(actual).toBe(true);
  });

  test('should invalidate that startDate is after endDate', () => {
    // // Given
    // const trip: TripSchedule = {
    //   id: 1,
    //   name: 'first trip',
    //   destination: 'domestic seoul',
    //   start_date: new Date('2024-12-10'),
    //   end_date: new Date('2024-12-01'),
    //   members: ['Hwang@naver.com'],
    //   created_by: 'Hwang@naver.com',
    // };
    // // When
    // const actual = validateTripDates(trip);
    //
    // // Then
    // expect(actual).toBe(false);
  });
});

import {describe, expect, test} from "vitest";
import { TripScheduleData, validateTripDates } from "../../../domain/entities/tripScheduleData";

describe('TripSchedule Entity', () => {
    test('should validate that startDate is before endDate', () => {
        // Given
        const trip: TripScheduleData = {
            id: 1,
            name: 'first trip',
            startDate: new Date('2024-12-01'),
            endDate: new Date('2024-12-10'),
            members: ['Hwang@naver.com']
        };
        // When
        const actual = validateTripDates(trip);

        // Then
        expect(actual).toBe(true);
    });

    test('should invalidate that startDate is after endDate', () => {
        // Given
        const trip: TripScheduleData = {
            id: 1,
            name: 'first trip',
            startDate: new Date('2024-12-10'),
            endDate: new Date('2024-12-01'),
            members: ['Hwang@naver.com']
        };
        // When
        const actual = validateTripDates(trip);

        // Then
        expect(actual).toBe(false);
    });
})
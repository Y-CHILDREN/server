import {describe, expect, test} from "vitest";
import {InMemoryTripScheduleRepositoryImpl} from "../../../data/repositoryImpls/inMemoryTripScheduleRepositoryImpl";
import {TripScheduleData} from "../../../domain/entities/tripScheduleData";

describe('ImMemoryTripScheduleRepositoryImpl', () => {
    const repository = new InMemoryTripScheduleRepositoryImpl();

    test('should create a new trip', async () => {
        // Given
        const trip: TripScheduleData = {
            id: 1,
            name: 'first trip',
            startDate: new Date('2024-12-01'),
            endDate: new Date('2024-12-10'),
            members: ['Hwang@naver.com']
        };

        // When
        const createdTrip = await repository.create(trip);

        // Then
        expect(createdTrip).toEqual(trip);
    });

    test('should update an existing trip', async () => {
        // Given
        const trip: TripScheduleData = {
            id: 1,
            name: 'first trip',
            startDate: new Date('2024-12-01'),
            endDate: new Date('2024-12-10'),
            members: ['Hwang@naver.com']
        };

        // When
        // create
        await repository.create(trip);

        // update
        trip.members.push('Jihwan@naver.com');
        await repository.update(trip);

        const updatedTrip = await repository.findTripById(1);

        // Then
        expect(updatedTrip?.members).toContain('Jihwan@naver.com') // Optional Chaining(?.)
    });
});
import { TripScheduleRepository } from '../../domain/repositories/tripScheduleRepository';
import { TripScheduleData } from '../../domain/entities/tripScheduleData';

const trips: TripScheduleData[] = [];
export class InMemoryTripScheduleRepositoryImpl
  implements TripScheduleRepository
{
  async create(trip: TripScheduleData): Promise<TripScheduleData> {
    trips.push(trip);
    return trip;
  }

  async update(trip: TripScheduleData): Promise<void> {
    const index = trips.findIndex((t) => t.id === trip.id);

    // find Index
    if (index !== -1) {
      trips[index] = trip;
    }
  }

  async findTripById(id: number): Promise<TripScheduleData | null> {
    return trips.find((trip) => trip.id === id) || null;
  }
}

import { TripScheduleRepository } from '../../domain/repositories/tripScheduleRepository';
import { TripSchedule } from '../../domain/entities/tripSchedule';

export class InMemoryTripScheduleRepositoryImpl
  implements TripScheduleRepository
{
  private trips: TripSchedule[] = [];

  async create(tripSchedule: Omit<TripSchedule, 'id'>): Promise<TripSchedule> {
    const id = this.trips.length + 1;
    const newTrip = { ...tripSchedule, id };
    this.trips.push(newTrip);
    return newTrip;
  }

  async update(trip: TripSchedule): Promise<void> {
    const index = this.trips.findIndex((t) => t.id === trip.id);

    // find Index
    if (index !== -1) {
      this.trips[index] = trip;
    }
  }

  async findTripById(id: number): Promise<TripSchedule | null> {
    return this.trips.find((trip) => trip.id === id) || null;
  }
}

import { TripSchedule } from '../entities/tripSchedule';

export interface TripScheduleRepository {
  create(tripSchedule: Omit<TripSchedule, 'id'>): Promise<TripSchedule>;
  update(tripSchedule: TripSchedule): Promise<void>;
  findTripById(id: number): Promise<TripSchedule | null>;
}

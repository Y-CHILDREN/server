import {
  TripSchedule,
  TripScheduleWithMembers,
} from '../entities/tripSchedule_update';
import { TripScheduleRepository } from '../repositories/tripScheduleRepository_update';

export class TripScheduleService {
  constructor(private tripScheduleRepository: TripScheduleRepository) {}

  async createTripSchedule(
    tripScheduleData: Omit<TripScheduleWithMembers, 'id'>,
  ): Promise<TripSchedule> {
    try {
      return await this.tripScheduleRepository.create(tripScheduleData);
    } catch (error) {
      console.error('TripScheduleService create error:', error);
      throw new Error(
        `Failed to create trip schedule: ${(error as Error).message}`,
      );
    }
  }

  async getTripSchedulesByUserId(userId: string): Promise<TripSchedule[]> {
    try {
      return await this.tripScheduleRepository.findTripsByUserId(userId);
    } catch (error) {
      console.error(
        'TripScheduleService getTripSchedulesByUserId error',
        error,
      );
      throw new Error('Failed to fetch trip schedules for user');
    }
  }
}

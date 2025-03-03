import {
  TripSchedule,
  TripScheduleWithMembers,
} from '../entities/tripSchedule_update';
import { TripScheduleRepository } from '../repositories/tripScheduleRepository_update';

export class TripScheduleService {
  constructor(private tripScheduleRepository: TripScheduleRepository) {}

  async createTripSchedule(
    tripScheduleData: TripScheduleWithMembers,
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
}

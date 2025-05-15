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

  // 유저가 속한 여행 일정 조회
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

  // 멤버를 포함한 여행 일정 조회
  async getTripScheduleWithmembers(
    tripId: number,
  ): Promise<TripSchedule & { members: string[] }> {
    const trip = await this.tripScheduleRepository.findTripById(tripId);

    if (!trip) {
      throw new Error('Trip not found');
    }

    const members = await this.tripScheduleRepository.getMembersEmail(tripId);

    return { ...trip, members };
  }

  // update
  async updateTripSchedule(trip: TripScheduleWithMembers): Promise<void> {
    await this.tripScheduleRepository.update(trip);
  }
}

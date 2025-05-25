import {
  TripSchedule,
  TripScheduleWithMembers,
} from '../entities/tripSchedule';
import { TripScheduleRepository } from '../repositories/tripScheduleRepository';

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

  // delete - 단일
  async deleteTripById(id: number): Promise<void> {
    try {
      const success = await this.tripScheduleRepository.deleteTripById(id);

      if (!success) {
        throw new Error('Trip deleted failed');
      }
    } catch (error) {
      console.error('TripScheduleService delete error:', error);
      throw new Error(`Failed to delete trip whit ID: ${id}`);
    }
  }

  // delete - 복수 (프론트 체크박스 미구현)
  async deleteTripsByIds(ids: number[]): Promise<void> {
    try {
      const success = await this.tripScheduleRepository.deleteTripsByIds(ids);
      if (!success) {
        throw new Error('Trip deleted failed');
      }
    } catch (error) {
      console.error('TripScheduleService deleteTripsByIds error:', error);
      throw new Error(`Failed to delete trips with IDs: ${ids.join(', ')}`);
    }
  }
}

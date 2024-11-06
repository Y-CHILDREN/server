import { TripSchedule } from '../entities/tripSchedule';

export interface TripScheduleRepository {
  create(tripSchedule: Omit<TripSchedule, 'id'>): Promise<TripSchedule>;
  update(tripSchedule: TripSchedule): Promise<void>;
  deleteById(id: number): Promise<boolean>;
  findTripById(id: number): Promise<TripSchedule | null>; // 특정 id로 조회
  findTripByIds(ids: number[]): Promise<TripSchedule[]>; // 여러 id로 조회
}

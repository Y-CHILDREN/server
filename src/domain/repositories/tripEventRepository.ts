import { TripEvent } from '../entities/tripEvent.js';

export interface TripEventRepository {
  create(tripSchedule: Omit<TripEvent, 'id'>): Promise<TripEvent>;
  update(tripSchedule: TripEvent): Promise<TripEvent>;
  deleteById(id: number): Promise<boolean>;
  findTripEventById(id: number): Promise<TripEvent | null>; // event id로 단일 조회
  findTripEventsByTripId(tripId: number[]): Promise<TripEvent[]>; // 여행 id로 여러 event로 조회
}

import { TripEvent } from '../entities/tripEvent.js';

export interface TripEventRepository {
  createTripEvent(
    tripEventData: Omit<TripEvent, 'event_id'>,
  ): Promise<TripEvent>;
  updateTripEvent(tripEventData: TripEvent): Promise<TripEvent>;
  deleteTripEventById(event_id: number): Promise<boolean>;
  getTripEventById(event_id: number): Promise<TripEvent | null>; // event id로 단일 조회
  getTripEventsByTripId(trip_id: number): Promise<TripEvent[] | null>; // 여행 id로 여러 event로 조회
}

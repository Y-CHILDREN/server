import { TripEventRepository } from '../../domain/repositories/tripEventRepository.js';
import { TripEvent } from '../../domain/entities/tripEvent.js';

export class InMemoryTripEventRepositoryImpl implements TripEventRepository {
  private tripEvents: TripEvent[] = []; // 메모리에 저장할 배열 (실제 DB 대신)

  async createTripEvent(
    tripEventData: Omit<TripEvent, 'event_id'>,
  ): Promise<TripEvent> {
    // spread 연산자 순서때문에 undefined값이 덮어 씌워지고 있었다.
    const newEvent: TripEvent = {
      ...tripEventData,
      event_id: this.tripEvents.length + 1,
    };

    this.tripEvents.push(newEvent);
    return newEvent;
  }

  async updateTripEvent(tripEventData: TripEvent): Promise<TripEvent> {
    const index = this.tripEvents.findIndex(
      (event) => event.event_id === tripEventData.event_id,
    );
    if (index === -1) throw new Error('이벤트를 찾을 수 없습니다.');

    this.tripEvents[index] = tripEventData;
    return tripEventData;
  }

  async deleteTripEventById(event_id: number): Promise<boolean> {
    const index = this.tripEvents.findIndex(
      (event) => event.event_id === event_id,
    );
    if (index === -1) return false;

    this.tripEvents.splice(index, 1);
    return true;
  }

  async getTripEventById(event_id: number): Promise<TripEvent | null> {
    return this.tripEvents.find((event) => event.event_id === event_id) || null;
  }

  async getTripEventsByTripId(trip_id: number): Promise<TripEvent[]> {
    return this.tripEvents.filter((event) => event.trip_id === trip_id);
  }
}

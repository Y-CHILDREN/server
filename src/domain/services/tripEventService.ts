import { TripEvent } from '../entities/tripEvent.js';
import { TripEventRepository } from '../repositories/tripEventRepository.js';

class TripEventService {
  constructor(
    // 의존성 주입
    private readonly tripEventRepository: TripEventRepository,
  ) {}
  // 이벤트 생성
  createTripEvent = async (
    tripEventData: Omit<TripEvent, 'event_id'>,
  ): Promise<TripEvent> => {
    // 날짜 유효성 검사 로직
    const { trip_id, event_name, location, start_date, end_date } =
      tripEventData;
    if (start_date > end_date) {
      throw new Error('잘못된 날짜 범위: 시작일은 마감일보다 앞서야 합니다.');
    }
    if (!trip_id || !event_name || !location || !start_date || !end_date) {
      throw new Error('모든 입력값에 올바른 값을 입력해주세요');
    }

    const tripEvent =
      await this.tripEventRepository.createTripEvent(tripEventData);
    return tripEvent;
  };
  // 스케쥴 업데이트
  updateTripEvent = async (tripEventData: TripEvent): Promise<TripEvent> => {
    const { trip_id, event_name, location, start_date, end_date } =
      tripEventData;

    if (start_date > end_date) {
      throw new Error('잘못된 날짜 범위: 시작일은 마감일보다 앞서야 합니다.');
    }

    if (!trip_id || !event_name || !location || !start_date || !end_date) {
      throw new Error('모든 입력값에 올바른 값을 입력해주세요');
    }

    const updatedTripEvent =
      await this.tripEventRepository.updateTripEvent(tripEventData);
    return updatedTripEvent;
  };

  // event_id로 event 단일 조회
  getTripEventById = async (event_id: number): Promise<TripEvent> => {
    if (!event_id) {
      throw new Error('event_id 값을 입력해주세요');
    }

    const tripEvent = await this.tripEventRepository.getTripEventById(event_id);

    if (!tripEvent) {
      throw new Error('잘못된 event_id 값입니다.');
    }
    return tripEvent;
  };

  // event_id로 event 단일 삭제
  deleteTripEventById = async (event_id: number): Promise<boolean> => {
    if (!event_id) {
      throw new Error('event_id 값을 입력해주세요');
    }
    const result = await this.tripEventRepository.deleteTripEventById(event_id);
    if (!result) {
      throw new Error('잘못된 event_id 값입니다.');
    }
    return result;
  };

  // trip_id로 event 모두 조회
  getTripEventsByTripId = async (
    trip_id: number,
  ): Promise<TripEvent[] | null> => {
    if (!trip_id) {
      throw new Error('trip_id 값을 입력해주세요');
    }
    const result =
      await this.tripEventRepository.getTripEventsByTripId(trip_id);
    if (!result) {
      throw new Error('잘못된 trip_id 값입니다.');
    }
    return result;
  };
}

export { TripEventService };

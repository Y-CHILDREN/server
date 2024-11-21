import { TripEvent } from '../../domain/entities/tripEvent.js';
import { TripEventDto } from '../dtos/event/tripEventDto.js';

export class TripEventConverter {
  static toDto(
    tripEvent: Omit<TripEvent, 'event_id'>,
  ): Omit<TripEventDto, 'event_id'> {
    return {
      trip_id: tripEvent.trip_id,
      event_name: tripEvent.event_name,
      location: tripEvent.location,
      start_date: tripEvent.start_date.toISOString(), // Date 객체를 ISO 문자열로 변환
      end_date: tripEvent.end_date.toISOString(), // Date 객체를 ISO 문자열로 변환
      cost: tripEvent.cost.map((costItem) => ({
        category: costItem.category,
        value: costItem.value,
      })),
    };
  }

  static fromDto(dto: TripEventDto): TripEvent {
    return {
      event_id: dto.event_id,
      trip_id: dto.trip_id,
      event_name: dto.event_name,
      location: dto.location,
      start_date: new Date(dto.start_date), // ISO 문자열을 Date 객체로 변환
      end_date: new Date(dto.end_date), // ISO 문자열을 Date 객체로 변환
      cost: dto.cost.map((costItem) => ({
        category: costItem.category,
        value: costItem.value,
      })),
    };
  }
}

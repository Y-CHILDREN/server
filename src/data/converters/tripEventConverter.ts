import { TripEvent } from '../../domain/entities/tripEvent.js';
import { TripEventDto } from '../dtos/event/tripEventDto.js';
import { TripEventResponseDto } from '../dtos/event/tripEventResponseDto.js';

export class TripEventConverter {
  // 엔티티로 들어가는 것
  static fromRequestDto(dto: TripEventDto): TripEvent {
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

  // 클라이언트에게 나가는 것
  static toResponseDto(tripEvent: TripEvent): TripEventResponseDto {
    return {
      event_id: tripEvent.event_id,
      trip_id: tripEvent.trip_id,
      event_name: tripEvent.event_name,
      location: tripEvent.location,
      start_date: tripEvent.start_date.toISOString(),
      end_date: tripEvent.end_date.toISOString(),
      cost: tripEvent.cost.map((costItem) => ({
        category: costItem.category,
        value: Number(costItem.value),
      })),
    };
  }
}

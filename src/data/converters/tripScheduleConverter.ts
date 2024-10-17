import { TripSchedule } from '../../domain/entities/tripSchedule';
import { CreateTripDto } from '../dtos/trip/createTripDto';
import { TripScheduleResponseDto } from '../dtos/trip/tripScheduleResponseDto';

export class TripScheduleConverter {
  static fromCreateTripDto(dto: CreateTripDto): TripSchedule {
    return {
      id: dto.id,
      name: dto.name,
      start_date: new Date(dto.start_date), // string -> Date
      end_date: new Date(dto.start_date),
      members: dto.members,
    };
  }

  static toResDto(tripSchedule: TripSchedule): TripScheduleResponseDto {
    return {
      id: tripSchedule.id,
      name: tripSchedule.name,
      start_date: tripSchedule.start_date.toISOString(), // Date -> string
      end_date: tripSchedule.end_date.toISOString(),
      members: tripSchedule.members,
    };
  }
}

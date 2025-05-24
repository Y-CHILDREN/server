import {
  TripSchedule,
  TripScheduleWithMembers,
} from '../../domain/entities/tripSchedule_update';
import { CreateTripDto } from '../dtos/trip/createTripDto';
import { TripScheduleResponseDto } from '../dtos/trip/tripScheduleResponseDto_update';

export class TripScheduleConverter {
  static fromCreateTripDto(
    source: CreateTripDto,
  ): Omit<TripScheduleWithMembers, 'id'> {
    return {
      name: source.title,
      destination: source.destination,
      start_date: new Date(source.start_date),
      end_date: new Date(source.end_date),
      members: source.members,
      created_by: source.created_by,
    };
  }

  static toResDto(
    tripSchedule: TripSchedule & { members: string[] },
  ): TripScheduleResponseDto {
    return {
      id: tripSchedule.id,
      title: tripSchedule.name, // `name`-> `title`
      destination: tripSchedule.destination,
      start_date: tripSchedule.start_date.toISOString(), // Date -> ISO string
      end_date: tripSchedule.end_date.toISOString(),
      members: tripSchedule.members,
      created_by: tripSchedule.created_by,
    };
  }

  static fromUpdateTripDto(
    source: any,
  ): Omit<TripSchedule, 'id' | 'created_by'> & { members: string[] } {
    return {
      name: source.title, // title을 name으로 매핑
      destination: source.destination,
      start_date: new Date(source.start_date), // Date 객체로 변환
      end_date: new Date(source.end_date),
      members: source.members,
    };
  }
}

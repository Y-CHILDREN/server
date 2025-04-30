import {
  TripSchedule,
  TripScheduleWithMembers,
} from '../entities/tripSchedule_update';
import { User } from '../models/user_update';
import { TripEvent } from '../entities/tripEvent_update';

export interface TripScheduleRepository {
  create(
    tripSchedule: Omit<TripScheduleWithMembers, 'id'>,
  ): Promise<TripSchedule>;
  update(tripSchedule: TripScheduleWithMembers): Promise<void>;
  // deleteById(id: number): Promise<boolean>; // 특정 id를 가진 여행 일정을 삭제.

  // 조회 기능
  findTripsByUserId(userId: string): Promise<TripSchedule[]>;
  // findTripById(id: number): Promise<TripSchedule | null>; // 특정 id의 여행 일정을 조회.
  // findTripByIds(ids: number[]): Promise<TripSchedule[]>; // 특정 유저가 속한 여행 일정을 조회.
  // findTripsByDateRange(startDate: Date, endDate: Date): Promise<TripSchedule[]>; // 특정 기간 내의 여행 일정을 조회

  // 멤버 관리 기능
  // addMember(tripId: number, userId: number): Promise<void>; // 특정 여행 일정에 멤버를 추가.
  // removeMember(tripId: number, userId: number): Promise<void>; // 특정 여행 일정에서 멤버를 제거.
  // getMembers(tripId: number): Promise<User[]>; // 특정 여행 일정의 멤버 목록을 조회.

  // 여행 일정 관련 기능
  // updateTripCost(tripId: number, totalCost: number): Promise<void>; // 여행 일정의 총 비용을 업데이.
  // getTripEvents(tripId: number): Promise<TripEvent[]>; // 특정 여행 일정의 이벤트 목록을 조회.
}

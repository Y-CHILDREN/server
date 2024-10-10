import { TravelSchedule } from '../domains/travelSchedule';

export interface ITravelScheduleRepository {
    create(travelSchedule: TravelSchedule): Promise<TravelSchedule>;
    // findByNickname(nickName: string): Promise<TravelSchedule>;
}
import { TripScheduleData } from "../entities/tripScheduleData";

export interface TripScheduleRepository {
    create(trip: TripScheduleData): Promise<TripScheduleData>;
    update(trip: TripScheduleData): Promise<void>;
    findTripById(id: number): Promise<TripScheduleData | null>;


    // 멤버 검색.

}
export interface TripSchedule {
  id: number; // auto_increase
  name: string;
  destination: string;
  start_date: Date;
  end_date: Date;
  created_by: string; // 생성한 유저 ID
}

export type TripScheduleWithMembers = TripSchedule & {
  members: string[];
};

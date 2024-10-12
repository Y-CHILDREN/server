export interface TripScheduleData {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
  members: string[];
}

// 날짜 유효성 검사.
export function validateTripDates(trip: TripScheduleData): boolean {
  return trip.startDate < trip.endDate;
}

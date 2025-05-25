// import { TripScheduleRepository } from '../../domain/repositories/tripScheduleRepository';
// import { TripSchedule } from '../../domain/entities/tripSchedule';
//
// export class InMemoryTripScheduleRepositoryImpl
//   implements TripScheduleRepository
// {
//   private trips: TripSchedule[] = [];
//
//   async create(tripSchedule: Omit<TripSchedule, 'id'>): Promise<TripSchedule> {
//     const id = this.trips.length + 1;
//     const newTrip = { ...tripSchedule, id };
//     this.trips.push(newTrip);
//     return newTrip;
//   }
//
//   async update(trip: TripSchedule): Promise<void> {
//     const index = this.trips.findIndex((t) => t.id === trip.id);
//
//     // find Index
//     if (index !== -1) {
//       this.trips[index] = trip;
//     }
//   }
//
//   async deleteById(id: number): Promise<boolean> {
//     // 삭제 전 배열 길이 확인.
//     const initialLength = this.trips.length;
//
//     // Id에 해당하는 trip을 trips에서 찾아 삭제.
//     this.trips = this.trips.filter((trip) => trip.id !== id);
//
//     return this.trips.length < initialLength; // 삭제가 여부 반환.
//     // 모든 데이터를 검사해야해서 효율이 좋지 않을 것 같음.
//   }
//
//   async findTripById(id: number): Promise<TripSchedule | null> {
//     return this.trips.find((trip) => trip.id === id) || null;
//   }
//
//   async findTripByIds(ids: number[]): Promise<TripSchedule[]> {
//     return this.trips.filter((trip) => ids.includes(trip.id));
//   }
// }

import { TripScheduleRepository } from '../repositories/tripScheduleRepository';
import { TripSchedule } from '../entities/tripSchedule';
import { UserRepository } from '../repositories/userRepository';

export class TripScheduleService {
  constructor(
    private tripRepository: TripScheduleRepository,
    private userRepository: UserRepository, // 유저 검색 기능
  ) {}

  // Create new Trip
  async createTripSchedule(
    data: Omit<TripSchedule, 'id'>,
  ): Promise<TripSchedule> {
    // 날짜 유효성 검사
    if (data.start_date >= data.end_date) {
      throw new Error('Invalid date range: startDate must be before endDate.');
    }

    // 이메일에 해당하는 유저 찾기.
    const user = await this.userRepository.findUserByEmail(data.created_by);
    if (!user) {
      throw new Error('User not found');
    }

    // 여행 일정 생성
    const savedTrip = await this.tripRepository.create(data);

    // 유저의 trip_history 업데이트
    const update = await this.userRepository.updateUserTripHistory(
      user.id,
      savedTrip.id,
    );
    if (!update) {
      throw new Error('Failed to update user trip history');
    }

    return savedTrip;
  }

  // Add member (email)
  async addMemberByEmail(tripId: number, email: string): Promise<void> {
    // search user by email
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('User(email) not found');
    }

    // get the trip by ID
    const trip = await this.tripRepository.findTripById(tripId);

    if (!trip) {
      throw new Error('Trip(Id) not found');
    }

    // add the user
    if (!trip.members.includes(user.email)) {
      trip.members.push(user.email);
      await this.tripRepository.update(trip);
    } else {
      throw new Error('User is already a member of the trip');
    }
  }

  // get Trip by id
  async getTripById(id: number): Promise<TripSchedule | null> {
    return await this.tripRepository.findTripById(id);
  }

  // delete Trip by id
  async deleteTripById(tripId: number): Promise<void> {
    const deletedTrip = await this.tripRepository.deleteById(tripId);
    if (!deletedTrip) {
      throw new Error('Trip(Id) not found');
    }

    // User.trip_history 배열에서 tripId를 제거 해야함.
    const users = await this.userRepository.getAllUsers();
    for (const user of users) {
      const removed = await this.userRepository.removeTripFromHistory(
        user.id,
        tripId,
      );

      if (removed) {
        console.log(`Removed trip Id ${tripId} from user ${user.id}'s history`);
      }
    }
  }

  // 여행 일정에 멤버를 추가.
}

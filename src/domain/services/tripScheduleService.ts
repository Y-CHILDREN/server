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

    // 멤버 중복 확인 및 중복 제거
    const uniqueMembers = Array.from(new Set(data.members));

    // 여행 일정 생성
    const savedTrip = await this.tripRepository.create({
      ...data,
      members: uniqueMembers, // 중복 제거한 members 배열 저장
    });

    // 각 멤버의 유효성을 확인하고 trip_history 갱신
    for (const email of uniqueMembers) {
      const user = await this.userRepository.findUserByEmail(email);
      if (!user) {
        throw new Error(`User with email ${email} not found`);
      }

      // 해당 유저의 trip_history 업데이트 시도
      const updated = await this.userRepository.updateUserTripHistory(
        user.id,
        savedTrip.id,
      );
      if (!updated) {
        throw new Error(`Failed to update trip history for user ${email}`);
      }
    }

    return savedTrip;
  }

  // Add member (email)
  async addTripMemberByEmail(tripId: number, email: string): Promise<void> {
    // search user by email
    const user = await this.userRepository.findUserByEmail(email);

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

  // get Trip by id
  async getTripById(id: number): Promise<TripSchedule | null> {
    return await this.tripRepository.findTripById(id);
  }

  // get Trips by userId
  async getUserTrips(userId: string): Promise<TripSchedule[]> {
    const user = await this.userRepository.findUserById(userId);
    if (!user) throw new Error('User not found');

    return this.tripRepository.findTripByIds(user.trip_history);
  }

  // update Trip
  async updateTripSchedule(
    tripId: number,
    updateData: Omit<TripSchedule, 'id' | 'created_by'>,
    newMemberEmails: string[] = [],
  ): Promise<TripSchedule> {
    const trip = await this.tripRepository.findTripById(tripId);
    if (!trip) {
      throw new Error('Trip not found');
    }

    // 기존 멤버와 업데이트된 새로운 멤버 배열을 비교하여 추가/제거 할 멤버 구분.
    const membersToAdd = newMemberEmails.filter(
      (email) => !trip.members.includes(email),
    ); // 추가된 멤버 배열.
    const membersToRemove = trip.members.filter(
      (email) => !newMemberEmails.includes(email),
    ); // 제거된 멤버 배열.

    // 업데이트할 필드 수정.
    Object.assign(trip, updateData);

    // 추가된 유저 trip_history에 반영.
    for (const email of membersToAdd) {
      const user = await this.userRepository.findUserByEmail(email);

      if (!user) {
        throw new Error(`User with email ${email} not found`);
      }

      // 중복 없이 멤버 추가
      if (!trip.members.includes(email)) {
        trip.members.push(email);

        // 해당 유저의 trip_history에 여행 ID 추가
        await this.userRepository.updateUserTripHistory(user.id, tripId);
      }
    }

    // 제거된 유저 trip_history에 반영.
    for (const email of membersToRemove) {
      // 멤버 제거
      trip.members = trip.members.filter((member) => member !== email);

      // 해당 유저의 trip_history에서 여행 ID 제거.
      const user = await this.userRepository.findUserByEmail(email);
      if (user) {
        await this.userRepository.removeTripFromHistory(user.id, tripId);
      }
    }

    // 여행 일정 업데이트
    await this.tripRepository.update(trip);
    return trip;
  }
}

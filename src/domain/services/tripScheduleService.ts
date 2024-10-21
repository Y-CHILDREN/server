import { TripScheduleRepository } from '../repositories/tripScheduleRepository';
import { TripSchedule } from '../entities/tripSchedule';
import { UserRepositoryDummy } from '../repositories/userRepositoryDummy';
import { CreateTripDto } from '../../data/dtos/trip/createTripDto';

export class TripScheduleService {
  constructor(
    private tripRepository: TripScheduleRepository,
    private userRepository: UserRepositoryDummy, // 유저 검색 기능
  ) {}

  // Create new Trip
  async createTripSchedule({
    name,
    start_date,
    end_date,
    members,
    created_by,
  }: CreateTripDto): Promise<TripSchedule> {
    if (start_date >= end_date) {
      throw new Error('Invalid date range: startDate must be before endDate.');
    }

    return this.tripRepository.create({
      name,
      start_date: new Date(start_date),
      end_date: new Date(end_date),
      members,
      created_by,
    });
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

  async getTripById(id: number): Promise<TripSchedule | null> {
    return await this.tripRepository.findTripById(id);
  }
}

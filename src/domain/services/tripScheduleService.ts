import { TripScheduleRepository } from '../repositories/tripScheduleRepository';
import {
  TripScheduleData,
  validateTripDates,
} from '../entities/tripScheduleData';
import { UserRepository } from '../repositories/userRepository';

export class TripScheduleService {
  constructor(
    private tripRepository: TripScheduleRepository,
    private userRepository: UserRepository, // 유저 검색 기능
  ) {}

  // Create new Trip
  async createTrip(trip: TripScheduleData): Promise<TripScheduleData> {
    if (!validateTripDates(trip)) {
      throw new Error('Invalid date range: startDate must be before endDate.');
    }

    return await this.tripRepository.create(trip);
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
}

import { Request, Response } from 'express';
import { TripScheduleService } from '../../domain/services/tripScheduleService';
import { CreateTripDto } from '../../data/dtos/trip/createTripDto';
import { TripScheduleConverter } from '../../data/converters/tripScheduleConverter';
import { TripSchedule } from '../../domain/entities/tripSchedule';

export class TripScheduleController {
  // constructor(private readonly tripScheduleService: TripScheduleService) {}

  // create trip
  async createTrip(req: Request, res: Response) {
    try {
      const tripScheduleService = req.app.get(
        'tripScheduleService',
      ) as TripScheduleService;

      // req.body에서 CreateTripDto 타입의 데이터를 추출
      const createTripDto: CreateTripDto = req.body;
      const tripData = TripScheduleConverter.fromCreateTripDto(createTripDto);

      // service 호출하여 여행 일정 생성.
      const createdTrip =
        await tripScheduleService.createTripSchedule(tripData);

      // createdTrip 결과를 response DTO convert
      // const responseDto = TripScheduleConverter.toResDto(createdTrip);
      res.status(201).json(createdTrip);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error: Failed to create trip' });
    }
  }

  // search member by email
  async addMemberByEmail(req: Request, res: Response) {
    try {
      const tripScheduleService = req.app.get(
        'tripScheduleService',
      ) as TripScheduleService;

      const { tripId, email } = req.body;

      await tripScheduleService.addTripMemberByEmail(tripId, email);

      res.status(200).json({
        message: 'Member added successfully',
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  // delete trip
  async deleteTripById(req: Request, res: Response) {
    try {
      const tripScheduleService = req.app.get(
        'tripScheduleService',
      ) as TripScheduleService;

      const { id } = req.params;
      const tripId = parseInt(id);

      await tripScheduleService.deleteTripById(tripId);

      res.status(200).json({ message: 'Trip deleted successfully' });
    } catch (error) {
      console.error('Error deleting trip', error);
      res.status(500).json({ message: 'Server error: Failed to delete trip' });
    }
  }

  // get trip
  async getTripById(req: Request, res: Response) {
    try {
      const tripScheduleService = req.app.get(
        'tripScheduleService',
      ) as TripScheduleService;

      const { id } = req.params;
      const trip = await tripScheduleService.getTripById(Number(id));

      if (!trip) {
        res.status(404).json({
          message: 'Trip not found',
        });
        return;
      }

      // Convert trip data -> response DTO
      const responseDto = TripScheduleConverter.toResDto(trip);
      res.status(200).json(responseDto);
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
      });
    }
  }

  // get all trip by user
  async getUserTrips(req: Request, res: Response): Promise<void> {
    try {
      const tripScheduleService = req.app.get(
        'tripScheduleService',
      ) as TripScheduleService;

      const { userId } = req.params; // req에서 userId를 받아옴
      const trips = await tripScheduleService.getUserTrips(userId);

      if (trips.length === 0) {
        res.status(404).json({ message: 'No trips for this user' });
        return;
      }
      res.status(200).json(trips);
    } catch (error) {
      console.error('get', error);
      res
        .status(500)
        .json({ message: 'Server error: Failed to get user trips' });
    }
  }
}

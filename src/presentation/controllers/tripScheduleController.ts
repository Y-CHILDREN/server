import { Request, Response } from 'express';
import { TripScheduleService } from '../../domain/services/tripScheduleService';
import { CreateTripDto } from '../../data/dtos/trip/createTripDto';
import { TripScheduleConverter } from '../../data/converters/tripScheduleConverter';

export class TripScheduleController {
  // constructor(private readonly tripScheduleService: TripScheduleService) {}

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
      res.status(500).json({ message: 'Server error: Failed to create trip' });
    }
  }

  async addMemberByEmail(req: Request, res: Response) {
    try {
      const tripScheduleService = req.app.get(
        'tripScheduleService',
      ) as TripScheduleService;

      const { tripId, email } = req.body;

      await tripScheduleService.addMemberByEmail(tripId, email);

      res.status(200).json({
        message: 'Member added successfully',
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }

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
}

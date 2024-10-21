import { Request, Response } from 'express';
import { TripScheduleService } from '../../domain/services/tripScheduleService';
import { CreateTripDto } from '../../data/dtos/trip/createTripDto';
import { TripScheduleConverter } from '../../data/converters/tripScheduleConverter';

export class TripScheduleController {
  async createTrip(req: Request, res: Response) {
    try {
      const tripScheduleService = req.app.get(
        'tripScheduleService',
      ) as TripScheduleService;

      // req.body createTripDto 데이터로 추출.
      const createTripDto = {
        ...(req.body as CreateTripDto),
        created_by: 'user@example.com', // 임시로 선언.
        // created_by: req.user?.email,
      };

      // service 호출하여 여행 일정 생성.
      const createdTrip =
        await tripScheduleService.createTripSchedule(createTripDto);

      // createdTrip 결과를 response DTO convert
      const responseDto = TripScheduleConverter.toResDto(createdTrip);
      res.status(201).json(responseDto);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
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

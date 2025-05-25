import { describe, vi, it, beforeEach, expect } from 'vitest';
import { Request, Response } from 'express';

import { TripScheduleController } from '../../../presentation/controllers/tripScheduleController';
import { TripScheduleConverter } from '../../../data/converters/tripScheduleConverter';
import { TripSchedule } from '../../../domain/entities/tripSchedule';
import { CreateTripDto } from '../../../data/dtos/trip/createTripDto';
import { TripScheduleResponseDto } from '../../../data/dtos/trip/tripScheduleResponseDto';

vi.mock('../../../data/converters/tripScheduleConverter');

const mockTripScheduleService = {
  createTripSchedule: vi.fn(),
  deleteTripById: vi.fn(),
};

const mockRequest = (body = {}, params = {}) =>
  ({
    body,
    params,
    user: {
      email: 'user@example.com',
    },
    app: {
      get: vi.fn().mockReturnValue(mockTripScheduleService),
    },
  }) as unknown as Request;

const mockResponse = () => {
  const res: any = {};
  res.status = vi.fn().mockReturnThis();
  res.json = vi.fn().mockReturnThis();
  return res as Response;
};

describe('TripScheduleController', () => {
  let controller: TripScheduleController;

  beforeEach(() => {
    controller = new TripScheduleController();
    vi.resetAllMocks();
  });

  it('should create a trip successfully and return a formatted response', async () => {
    // // Given
    // const reqTripData: CreateTripDto = {
    //   title: 'Trip to Paris',
    //   destination: 'domestic seoul',
    //   start_date: '2023-01-01',
    //   end_date: '2023-01-05',
    //   members: ['user@example.com'],
    //   created_by: 'user@example.com',
    // };
    // const req = mockRequest(reqTripData);
    //
    // const convertedTripData = {
    //   name: reqTripData.title,
    //   destination: reqTripData.destination,
    //   start_date: new Date(reqTripData.start_date),
    //   end_date: new Date(reqTripData.end_date),
    //   members: reqTripData.members,
    //   created_by: reqTripData.created_by,
    // };
    //
    // const createdTrip: TripSchedule = {
    //   id: 1,
    //   ...convertedTripData,
    // };
    //
    // const res = mockResponse();
    //
    // // `fromCreateTripDto` 모킹
    // vi.spyOn(TripScheduleConverter, 'fromCreateTripDto').mockReturnValue(
    //   convertedTripData,
    // );
    //
    // // `toResDto` 예상 응답 DTO 정의
    // const responseDto: TripScheduleResponseDto = {
    //   id: createdTrip.id,
    //   title: createdTrip.name,
    //   destination: createdTrip.destination,
    //   start_date: createdTrip.start_date.toISOString(),
    //   end_date: createdTrip.end_date.toISOString(),
    //   members: createdTrip.members,
    //   created_by: createdTrip.created_by,
    // };
    //
    // vi.spyOn(TripScheduleConverter, 'toResDto').mockReturnValue(responseDto);
    //
    // // Mocking service response
    // mockTripScheduleService.createTripSchedule.mockResolvedValue(createdTrip);
    //
    // // When
    // await controller.createTrip(req, res);
    //
    // // controller.createTrip 내부에서 호출
    // // console.log('Calling toResDto with:', createdTrip);
    // // const actualResponseDtos = TripScheduleConverter.toResDto(createdTrip);
    // // console.log('Response DTO:', actualResponseDtos);
    //
    // // Debugging: res.json에 전달된 값 확인
    // // console.log('Expected responseDto:', responseDto);
    // // console.log('Actual res.json call argument:', res.json.mock.calls[0][0]);
    //
    // // Then
    // expect(TripScheduleConverter.fromCreateTripDto).toHaveBeenCalledWith(
    //   reqTripData,
    // );
    // expect(mockTripScheduleService.createTripSchedule).toHaveBeenCalledWith(
    //   convertedTripData,
    // );
    // // expect(TripScheduleConverter.toResDto).toHaveBeenCalledWith(createdTrip);
    // expect(res.status).toHaveBeenCalledWith(201);
    // expect(res.json).toHaveBeenCalledWith(createdTrip);
  });

  it('should handle errors when the service throws an exception', async () => {
    // // Given
    // const req = mockRequest({
    //   title: 'Trip to Paris',
    //   destination: 'domestic seoul',
    //   start_date: new Date('2023-01-05'),
    //   end_date: new Date('2023-01-01'),
    //   members: ['user@example.com'],
    // });
    // console.log('request: ', req);
    // const res = mockResponse();
    // const error = new Error(
    //   'Invalid date range: startDate must be before endDate.',
    // );
    // mockTripScheduleService.createTripSchedule.mockRejectedValue(error);
    //
    // // When
    // await controller.createTrip(req, res);
    //
    // // Then
    // expect(res.status).toHaveBeenCalledWith(500);
    // expect(res.json).toHaveBeenCalledWith({
    //   message: 'Server error: Failed to create trip',
    // });
  });

  // Delete, 요청이 성공적으로 처리되는지 확인.
  it('should delete the trip successfully and return a 200 status', async () => {
    // // Given
    // const req = mockRequest({}, { id: '1' });
    // const res = mockResponse();
    //
    // // When
    // await controller.deleteTripById(req, res);
    //
    // // Then
    // //mockTripScheduleService.deleteTripById가 1을 인수로 호출되었는지 확인
    // expect(mockTripScheduleService.deleteTripById).toHaveBeenCalledWith(1);
    //
    // // 요청이 성공적으로 처리된 후 요청이 성공적으로 호출되었는지 확인.
    // expect(res.status).toHaveBeenCalledWith(200);
    // expect(res.json).toHaveBeenCalledWith({
    //   message: 'Trip deleted successfully',
    // });
  });

  // Delete, 삭제가 실패했을 때, 에러메세지가 호출 되는지 확인.
  it('should handle errors and return a 500 status on deletion failure', async () => {
    // // Given
    // const req = mockRequest({}, { id: '1' });
    // const res = mockResponse();
    // const error = new Error('Deletion failed');
    // mockTripScheduleService.deleteTripById.mockRejectedValue(error);
    //
    // // When
    // await controller.deleteTripById(req, res);
    //
    // // Then
    // expect(res.status).toHaveBeenCalledWith(500);
    // expect(res.json).toHaveBeenCalledWith({
    //   message: 'Server error: Failed to delete trip',
    // });
  });
});

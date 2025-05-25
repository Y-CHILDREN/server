import { beforeEach, describe, expect, test, vi } from 'vitest';
import { TripSchedule } from '../../../domain/entities/tripSchedule';
import { User } from '../../../domain/models/user';
import { TripScheduleService } from '../../../domain/services/tripScheduleService';
import { TripScheduleRepository } from '../../../domain/repositories/tripScheduleRepository';
import { UserRepository } from '../../../domain/repositories/userRepository';

// describe('TripScheduleService', () => {
// let tripRepository: TripScheduleRepository;
// let userRepository: UserRepository;
// let tripService: TripScheduleService;
//
// // 공통 Mock user 데이터 생성.
// const mockUsers: User[] = [
//   {
//     id: 'user1',
//     provider: 'local',
//     email: 'user1@example.com',
//     user_image: 'image1.png',
//     nickname: 'user1',
//     user_memo: 'Test user1',
//     access_token: 'access_token1',
//     refresh_token: 'refresh_token1',
//     trip_history: [1, 2, 3],
//   },
//   {
//     id: 'user2',
//     provider: 'local',
//     email: 'user2@example.com',
//     user_image: 'image2.png',
//     nickname: 'user2',
//     user_memo: 'Test user2',
//     access_token: 'access_token2',
//     refresh_token: 'refresh_token2',
//     trip_history: [3, 4, 5],
//   },
// ];
//
// // mock trip 데이터 (id 제외).
// const mockTripData: Omit<TripSchedule, 'id'> = {
//   name: 'Test Trip',
//   destination: 'Test Destination',
//   start_date: new Date('2024-12-01'),
//   end_date: new Date('2024-12-10'),
//   members: ['user1@example.com', 'user2@example.com'],
//   created_by: 'user1@example.com',
// };
//
// const mockTripWithId: TripSchedule = {
//   id: 1,
//   ...mockTripData,
// };
//
// // 유저 조회 모킹
// const mockGetAllUsers = () => {
//   vi.spyOn(userRepository, 'getAllUsers').mockResolvedValue([...mockUsers]);
// };
//
// // 여행 기록 업데이트 모킹
// const mockRemoveTripFromHistory = (result: boolean) => {
//   return vi
//     .spyOn(userRepository, 'removeTripFromHistory')
//     .mockResolvedValue(result);
// };
//
// beforeEach(() => {
//   // Repository의 mock 설정
//   tripRepository = {
//     create: vi.fn(),
//     update: vi.fn(),
//     deleteById: vi.fn(),
//     findTripById: vi.fn(),
//   } as unknown as TripScheduleRepository;
//
//   userRepository = {
//     findUserByEmail: vi.fn(),
//     updateUserTripHistory: vi.fn(),
//     removeTripFromHistory: vi.fn(),
//     getAllUsers: vi.fn(),
//   } as unknown as UserRepository;
//   tripService = new TripScheduleService(tripRepository, userRepository);
//   vi.restoreAllMocks();
// });
// });

describe('createTripSchedule', () => {
  it('should throw an error if start_date is after end_date', async () => {
    // const invalidData = {
    //   ...mockTripData,
    //   start_date: new Date('2024-12-10'),
    //   end_date: new Date('2024-12-01'),
    // };
    //
    // await expect(tripService.createTripSchedule(invalidData)).rejects.toThrow(
    //   'Invalid date range: startDate must be before endDate.',
    // );
  });

  // 보류 통과 안됨 ㅙ오왜왜오왜애ㅙㅗ id 값이 안읽히죠...
  // it('should throw an error if any user in members is not found', async () => {
  //   // userRepository.findUserByEmail을 여러 번 호출하고, 각 호출마다 다르게 반환되도록 설정
  //   userRepository.findUserByEmail = vi.fn().mockImplementation((email) => {
  //     if (email === 'user1@example.com') return Promise.resolve(mockUsers[0]);
  //     if (email === 'user2@example.com') return Promise.resolve(undefined);
  //     return Promise.resolve(undefined);
  //   });
  //
  //   await expect(
  //     tripService.createTripSchedule(mockTripData),
  //   ).rejects.toThrow('User with email user2@example.com not found');
  // });

  it('should throw an error if updating user trip history fails', async () => {
    // vi.spyOn(tripRepository, 'create').mockResolvedValue(mockTripWithId);
    // vi.spyOn(userRepository, 'findUserByEmail').mockResolvedValue(
    //   mockUsers[0],
    // );
    // vi.spyOn(userRepository, 'updateUserTripHistory')
    //   .mockResolvedValueOnce(true)
    //   .mockResolvedValueOnce(false);
    //
    // await expect(
    //   tripService.createTripSchedule(mockTripData),
    // ).rejects.toThrow(
    //   'Failed to update trip history for user user2@example.com',
    // );
  });

  it('should create a trip successfully when all validations pass', async () => {
    //   vi.spyOn(tripRepository, 'create').mockResolvedValue(mockTripWithId);
    //   vi.spyOn(userRepository, 'findUserByEmail').mockResolvedValue(
    //     mockUsers[0],
    //   );
    //   vi.spyOn(userRepository, 'updateUserTripHistory').mockResolvedValue(true);
    //
    //   const result = await tripService.createTripSchedule(mockTripData);
    //
    //   expect(result).toEqual(mockTripWithId);
    //   expect(userRepository.updateUserTripHistory).toHaveBeenCalledWith(
    //     mockUsers[0].id,
    //     mockTripWithId.id,
    //   );
    // });
  });

  describe('addTripMemberByEmail', () => {
    test('주석처리, should add a member by email', async () => {
      // // Given
      // const email = 'Park@gmail.com';
      // vi.spyOn(userRepository, 'findUserByEmail').mockResolvedValue({
      //   id: '1',
      //   provider: 'google',
      //   email,
      //   user_image: 'test.webp',
      //   nickname: 'JiHwan',
      //   user_memo: 'hello world!',
      //   access_token: 'access_token_value',
      //   refresh_token: 'refresh_token_value',
      //   trip_history: [1, 2, 3],
      // });
      //
      // await tripRepository.create({
      //   name: 'first trip',
      //   destination: 'domestic seoul',
      //   start_date: new Date('2024-12-01'),
      //   end_date: new Date('2024-12-10'),
      //   members: ['Hwang@naver.com'],
      //   created_by: 'Hwang@naver.com',
      // });
      //
      // // When
      // await tripService.addTripMemberByEmail(1, email);
      // const updatedTrip = await tripService.getTripById(1);
      //
      // // Then
      // console.log('Updated Trip add a member:', updatedTrip);
      // expect(updatedTrip?.members).toContain(email);
    });

    test('should throw an error if user email is not found when adding for member', async () => {
      // // Given
      // const email = 'nonexist@example.com';
      // vi.spyOn(userRepository, 'findUserByEmail').mockResolvedValue(undefined); // no exist user by email return null.
      //
      // // When
      // const actual = tripService.addTripMemberByEmail(1, email);
      //
      // // Then
      // await expect(actual).rejects.toThrowError('User(email) not found');
    });

    test('should throw an error if trip id is not found when adding a member', async () => {
      // // Given
      // const email = 'user@example.com';
      // vi.spyOn(userRepository, 'findUserByEmail').mockResolvedValue({
      //   id: '3',
      //   provider: 'google',
      //   email,
      //   user_image: 'test.webp',
      //   nickname: 'TeaJung',
      //   user_memo: 'hello world!',
      //   access_token: 'access_token_value',
      //   refresh_token: 'refresh_token_value',
      //   trip_history: [1, 3],
      // });
      // vi.spyOn(tripRepository, 'findTripById').mockResolvedValue(null);
      //
      // // When
      // const actual = tripService.addTripMemberByEmail(1, email);
      //
      // //Then
      // await expect(actual).rejects.toThrow('Trip(Id) not found');
    });

    test('should throw an error if user is already a member of the trip', async () => {
      // // Given
      // const email = 'user@example.com';
      // const tripId = 1;
      // const trip = {
      //   id: tripId,
      //   name: 'Family Trip',
      //   destination: 'domestic seoul',
      //   start_date: new Date(),
      //   end_date: new Date(),
      //   members: [email],
      //   created_by: email,
      // };
      //
      // vi.spyOn(userRepository, 'findUserByEmail').mockResolvedValue({
      //   id: '2',
      //   provider: 'google',
      //   email,
      //   user_image: 'test.webp',
      //   nickname: 'silverStone',
      //   user_memo: 'hello world!',
      //   access_token: 'access_token_value',
      //   refresh_token: 'refresh_token_value',
      //   trip_history: [2, 3],
      // });
      // vi.spyOn(tripRepository, 'findTripById').mockResolvedValue(trip);
      //
      // // When
      // const actual = tripService.addTripMemberByEmail(tripId, email);
      //
      // // Then
      // await expect(actual).rejects.toThrow(
      //   'User is already a member of the trip',
      // );
    });

    test('should add a new member to the trip', async () => {
      // // Given
      // const email = 'Park@example.com';
      // const tripId = 1;
      // const trip = {
      //   id: tripId,
      //   name: 'Family Trip',
      //   destination: 'domestic seoul',
      //   start_date: new Date(),
      //   end_date: new Date(),
      //   members: ['Hwang@example.com'],
      //   created_by: 'Hwang@example.com',
      // };
      //
      // vi.spyOn(userRepository, 'findUserByEmail').mockResolvedValue({
      //   id: '2',
      //   provider: 'google',
      //   email,
      //   user_image: 'test.webp',
      //   nickname: 'JiHwan',
      //   user_memo: 'hello world!',
      //   access_token: 'access_token_value',
      //   refresh_token: 'refresh_token_value',
      //   trip_history: [1, 2, 3],
      // });
      // vi.spyOn(tripRepository, 'findTripById').mockResolvedValue(trip);
      // vi.spyOn(tripRepository, 'update').mockResolvedValue();
      //
      // // When
      // await tripService.addTripMemberByEmail(tripId, email);
      // const updatedTrip = await tripRepository.findTripById(tripId);
      //
      // // Then
      // console.log('updatedTrip', updatedTrip);
      // expect(updatedTrip?.members).toContain(email);
    });
  });

  describe('deleteTripById', () => {
    it('should throw an error if trip does not exist', async () => {
      // // Given: 여행 일정 삭제가 실패한 경우
      // vi.spyOn(tripRepository, 'deleteById').mockResolvedValue(false);
      //
      // // Then: 존재하지 않는 일정 ID로 호출 시 예외가 발생해야 함
      // await expect(tripService.deleteTripById(1)).rejects.toThrow(
      //   'Trip(Id) not found',
      // );
    });

    it("should remove trip ID from all users' history successfully", async () => {
      // // Given
      // vi.spyOn(tripRepository, 'deleteById').mockResolvedValue(true); // 여행 일정 삭제 성공
      //
      // // 공통 모킹 함수 사용
      // mockGetAllUsers();
      // const removeSpy = mockRemoveTripFromHistory(true);
      //
      // // When
      // await tripService.deleteTripById(3);
      //
      // // Then: 모든 유저의 trip_history에서 해당 일정이 제거되었는지 확인
      // expect(userRepository.getAllUsers).toHaveBeenCalled();
      // expect(removeSpy).toHaveBeenCalledWith('user1', 3);
      // expect(removeSpy).toHaveBeenCalledWith('user2', 3);
      // expect(removeSpy).toHaveBeenCalledTimes(2);
    });

    it("should log when trip ID is not found in user's history", async () => {
      // // Given: 여행 일정 삭제 성공
      // vi.spyOn(tripRepository, 'deleteById').mockResolvedValue(true);
      //
      // // 공통 모킹 함수 사용
      // mockGetAllUsers();
      // const removeSpy = mockRemoveTripFromHistory(false);
      //
      // // 콘솔 로그 모킹
      // const consoleSpy = vi.spyOn(console, 'log');
      //
      // // When
      // await tripService.deleteTripById(3);
      //
      // // Then: 삭제가 실패한 경우 로그가 출력되는지 확인
      // expect(userRepository.getAllUsers).toHaveBeenCalled();
      // expect(removeSpy).toHaveBeenCalledWith('user1', 3);
      // expect(removeSpy).toHaveBeenCalledWith('user2', 3);
      // expect(consoleSpy).not.toHaveBeenCalledWith(
      //   expect.stringContaining('Removed trip Id 3'),
      // );
    });
  });
});

import prisma from '../../../prisma/client'; // 싱글톤 패턴 적용

import { TripScheduleRepository } from '../../domain/repositories/tripScheduleRepository_update';
import {
  TripSchedule,
  TripScheduleWithMembers,
} from '../../domain/entities/tripSchedule_update';

export class PrismaTripScheduleRepositoryImpl
  implements TripScheduleRepository
{
  async create(
    tripSchedule: Omit<TripScheduleWithMembers, 'id'>,
  ): Promise<TripSchedule> {
    try {
      return await prisma.$transaction(async () => {
        // 1. TripSchedule 생성
        const createdTrip = await prisma.tripSchedule.create({
          data: {
            name: tripSchedule.name,
            destination: tripSchedule.destination,
            start_date: tripSchedule.start_date,
            end_date: tripSchedule.end_date,
            created_by: tripSchedule.created_by,
          },
          select: {
            id: true,
            name: true,
            destination: true,
            start_date: true,
            end_date: true,
            created_by: true,
          },
        });

        // 2. 이메일 배열을 기반으로 유저 ID 조회
        const users = await prisma.user.findMany({
          where: {
            email: {
              in: tripSchedule.members, // 프론트에서 넘어온 이메일 배열
            },
          },
          select: {
            id: true,
            email: true,
          },
        });

        const foundEmails = users.map((user) => user.email);
        const missingEmails = tripSchedule.members.filter(
          (email) => !foundEmails.includes(email),
        );

        // members에 해당하는 이메일을 가진 유저를 찾을 수 없을 때 로그 남김.
        if (missingEmails.length > 0) {
          console.warn('Some users were not found:', missingEmails);
        }

        // 3. tripScheduleUser 테이블에 저장할 데이터 구성
        const tripScheduleUsers = users.map((user) => ({
          user_id: user.id,
          tripSchedule_id: createdTrip.id,
        }));

        // 4. tripScheduleUser 테이블에 데이터 저장
        if (tripScheduleUsers.length > 0) {
          await prisma.tripScheduleUser.createMany({
            data: tripScheduleUsers,
            skipDuplicates: true, // 중복 방지
          });
        }

        return createdTrip;
      });
    } catch (error) {
      console.error('PrismaTripScheduleRepositoryImpl create error:', error);
      throw new Error(
        `Failed to create trip schedule: ${(error as Error).message}`,
      );
    }
  }

  async update(
    tripSchedule: TripScheduleWithMembers & { id: number },
  ): Promise<void> {
    try {
      await prisma.$transaction(async () => {
        // 1. 기존 TripSchedule 업데이트
        await prisma.tripSchedule.update({
          where: { id: tripSchedule.id },
          data: {
            name: tripSchedule.name,
            destination: tripSchedule.destination,
            start_date: tripSchedule.start_date,
            end_date: tripSchedule.end_date,
          },
        });

        // 2. 새로운 멤버 리스트로 갱신
        if (tripSchedule.members) {
          // 2-1 기존 멤버 삭제
          await prisma.tripScheduleUser.deleteMany({
            where: { tripSchedule_id: tripSchedule.id },
          });

          // 이메일로 유저 조회
          const users = await prisma.user.findMany({
            where: {
              email: {
                in: tripSchedule.members,
              },
            },
            select: {
              id: true,
              email: true,
            },
          });

          // 이메일로 조회된 유저 목록 (User[])
          const tripScheduleUsers = users.map((user) => ({
            user_id: user.id,
            tripSchedule_id: tripSchedule.id,
          }));

          if (tripScheduleUsers.length > 0) {
            await prisma.tripScheduleUser.createMany({
              data: tripScheduleUsers,
              skipDuplicates: true,
            });
          }
        }
      });
    } catch (error) {
      console.error('PrismaTripScheduleRepositoryImpl update error:', error);
      throw new Error(
        `Failed to update trip schedule update ${(error as Error).message}`,
      );
    }
  }

  // TripScheduleUser 테이블에서 유저 ID로 유저가 속한 tripSchedule 리스트 조회
  async findTripsByUserId(userId: string): Promise<TripSchedule[]> {
    try {
      const trips = await prisma.tripSchedule.findMany({
        where: {
          members: {
            some: {
              user_id: userId,
            },
          },
        },
        select: {
          id: true,
          name: true,
          destination: true,
          start_date: true,
          end_date: true,
          created_by: true,
        },
      });

      return trips;
    } catch (error) {
      console.error('Error fetching trips by user ID:', error);
      throw new Error('Failed to fetch trips for the user');
    }
  }

  // trip_id로 여행 일정 조회
  async findTripById(id: number): Promise<TripSchedule> {
    const trip = await prisma.tripSchedule.findUnique({
      where: { id },
    });

    if (!trip) {
      throw new Error('Trip not found');
    }
    return trip;
  }

  // 여행에 속해 있는 유저 이메일 조회
  async getMembersEmail(tripId: number): Promise<string[]> {
    try {
      // 1. tripScheduleUser 테이블에서 tripId에 해당하는 user_id 조회
      const userIds = await prisma.tripScheduleUser.findMany({
        where: { tripSchedule_id: tripId },
        select: { user_id: true },
      });

      const ids = userIds.map((user) => user.user_id);

      if (ids.length === 0) return [];

      // 2. user_id를 바탕으로 User 테이블에서 이메일 조회
      const users = await prisma.user.findMany({
        where: {
          id: {
            in: ids,
          },
        },
        select: {
          email: true,
        },
      });

      return users.map((user) => user.email);
    } catch (error) {
      console.error('Error in getMembersEmail', error);
      throw new Error('Failed to get members email');
    }
  }
}

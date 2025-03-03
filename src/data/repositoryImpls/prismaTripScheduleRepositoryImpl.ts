import prisma from '../../../prisma/client'; // 싱글톤 패턴 적용

import { TripScheduleRepository } from '../../domain/repositories/tripScheduleRepository_update';
import {
  TripSchedule,
  TripScheduleWithMembers,
} from '../../domain/entities/tripSchedule_update';

export class PrismaTripScheduleRepositoryImpl
  implements TripScheduleRepository
{
  async create(tripSchedule: TripScheduleWithMembers): Promise<TripSchedule> {
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
}

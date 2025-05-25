import prisma from '../../../prisma/client';
import { User as PrismaUser } from '@prisma/client';

import { User } from '../../domain/models/user';
import { UserRepository } from '../../domain/repositories/userRepository';

export class PrismaUserRepositoryImpl implements UserRepository {
  async createUser(userData: Omit<User, 'id'>): Promise<User> {
    const createdUser = await prisma.user.create({ data: userData });
    return this.mapPrismaUserToUser(createdUser);
  }

  async findUserById(id: string): Promise<User | undefined> {
    const user = await prisma.user.findUnique({ where: { id } });
    return user ? this.mapPrismaUserToUser(user) : undefined;
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    const user = await prisma.user.findUnique({ where: { email } });
    return user ? this.mapPrismaUserToUser(user) : undefined;
  }

  async findUsersByEmail(email: string): Promise<User[] | undefined> {
    const users = await prisma.user.findMany({ where: { email } });
    return users.length > 0 ? users.map(this.mapPrismaUserToUser) : undefined;
  }

  // 이메일 배열로 여러 유저 조회
  async findUsersByEmails(emails: string[]): Promise<User[]> {
    const users = await prisma.user.findMany({
      where: {
        email: { in: emails },
      },
    });
    return users.map(this.mapPrismaUserToUser);
  }

  async findUserByEmailAndProvider(
    email: string,
    provider: string,
  ): Promise<User | undefined> {
    const user = await prisma.user.findFirst({ where: { email, provider } });
    return user ? this.mapPrismaUserToUser(user) : undefined;
  }

  // 이메일에 검색 텍스트가 포함된 유저 목록 조회
  async findUsersByEmailContains(query: string): Promise<User[]> {
    const users = await prisma.user.findMany({
      where: {
        email: {
          contains: query,
          mode: 'insensitive', // 대소문자 구분 없이 검색
        },
      },
      take: 10, // 최대 10명 반환
    });

    return users.map(this.mapPrismaUserToUser);
  }

  async updateTokens(
    email: string,
    access_token: string,
    refresh_token: string,
  ): Promise<void> {
    await prisma.user.update({
      where: { email },
      data: { access_token, refresh_token },
    });
  }

  async getAllUsers(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users.map(this.mapPrismaUserToUser);
  }

  async updateUserImage(
    id: string,
    user_image: string,
  ): Promise<User | undefined> {
    const user = await prisma.user.update({
      where: { id },
      data: { user_image },
    });
    return user ? this.mapPrismaUserToUser(user) : undefined;
  }

  async updateUserNickname(
    id: string,
    nickname: string,
  ): Promise<User | undefined> {
    const user = await prisma.user.update({
      where: { id },
      data: { nickname },
    });
    return user ? this.mapPrismaUserToUser(user) : undefined;
  }

  async updateUserMemo(
    id: string,
    user_memo: string,
  ): Promise<User | undefined> {
    const user = await prisma.user.update({
      where: { id },
      data: { user_memo },
    });
    return user ? this.mapPrismaUserToUser(user) : undefined;
  }

  async deleteUser(id: string): Promise<boolean> {
    try {
      await prisma.user.delete({ where: { id } });
      return true;
    } catch (error) {
      console.error('Error deleting user', error);
      return false;
    }
  }

  // ✅ User가 속한 TripSchedule ID 목록 조회 (중간 테이블 활용)
  async getUserTripSchedules(user_id: string): Promise<number[]> {
    const userTrips = await prisma.tripScheduleUser.findMany({
      where: { user_id },
      select: { tripSchedule_id: true },
    });
    return userTrips.map(
      (trip: { tripSchedule_id: number }) => trip.tripSchedule_id,
    );
  }

  // ✅ User를 특정 TripSchedule에 추가 (중간 테이블 활용)
  async addUserToTripSchedule(
    user_id: string,
    tripSchedule_id: number,
  ): Promise<void> {
    try {
      await prisma.tripScheduleUser.create({
        data: { user_id, tripSchedule_id },
      });
    } catch (error) {
      console.error(
        `Error adding user ${user_id} to trip ${tripSchedule_id}:`,
        error,
      );
      throw new Error('Failed to add user to trip schedule.');
    }
  }

  // ✅ User를 TripSchedule에서 제거 (중간 테이블 활용)
  async removeUserFromTripSchedule(
    user_id: string,
    tripSchedule_id: number,
  ): Promise<void> {
    try {
      await prisma.tripScheduleUser.deleteMany({
        where: { user_id, tripSchedule_id },
      });
    } catch (error) {
      console.error(
        `Error removing user ${user_id} from ${tripSchedule_id}:`,
        error,
      );
      throw new Error('Failed to remove user from trip schedule.');
    }
  }

  // Prisma.User -> User 변환 함수
  private mapPrismaUserToUser(prismaUser: PrismaUser): User {
    return {
      id: prismaUser.id,
      provider: prismaUser.provider,
      email: prismaUser.email,
      user_image: prismaUser.user_image ?? undefined, // `null`을 `undefined`로 변환
      nickname: prismaUser.nickname,
      user_memo: prismaUser.user_memo ?? undefined, // `null`을 `undefined`로 변환
      access_token: prismaUser.access_token,
      refresh_token: prismaUser.refresh_token,
      created_at: prismaUser.created_at,
    };
  }
}

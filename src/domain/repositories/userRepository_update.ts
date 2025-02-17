import { User } from '../models/user_update';

export interface UserRepository {
  createUser: (userData: Omit<User, 'id'>) => Promise<User>;
  findUserById: (id: string) => Promise<User | undefined>;
  findUserByEmail: (email: string) => Promise<User | undefined>;
  findUsersByEmail: (email: string) => Promise<User[] | undefined>;
  findUserByEmailAndProvider: (
    email: string,
    provider: string,
  ) => Promise<User | undefined>;
  updateTokens: (
    email: string,
    access_token: string,
    refresh_token: string,
  ) => Promise<void>;
  getAllUsers: () => Promise<User[]>;
  updateUserImage: (
    id: string,
    user_image: string,
  ) => Promise<User | undefined>;
  updateUserNickname: (
    id: string,
    nickname: string,
  ) => Promise<User | undefined>;
  updateUserMemo: (id: string, user_memo: string) => Promise<User | undefined>;

  deleteUser: (id: string) => Promise<boolean>;

  // ✅ 중간 테이블을 고려한 추가 기능 (User가 참여한 TripSchedule 관리)
  getUserTripSchedules: (user_id: string) => Promise<number[]>; // User가 속한 TripSchedule ID 조회
  addUserToTripSchedule: (
    user_id: string,
    tripSchedule_id: number,
  ) => Promise<void>; // User를 TripSchedule에 추가
  removeUserFromTripSchedule: (
    user_id: string,
    tripSchedule_id: number,
  ) => Promise<void>; // TripSchedule에서 User 제거
}

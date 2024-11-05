import { User } from '../models/user';

export interface UserRepository {
  createUser: (userData: Omit<User, 'id'>) => Promise<User>;
  findUserById: (id: string) => Promise<User | undefined>;
  findUserByEmail: (email: string) => Promise<User | undefined>;
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
  updateUserTripHistory: (userId: string, tripId: number) => Promise<boolean>; // 함수 표현식 방식
  // updateUserTripHistory2(userId: string, tripId: number): Promise<void>; // 메서드 방식
  removeTripFromHistory: (userId: string, tripId: number) => Promise<boolean>;
}

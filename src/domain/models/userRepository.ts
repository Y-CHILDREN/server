import { User } from './user';

export interface UserRepository {
  createUser: (userData: Omit<User, 'id'>) => Promise<User>;
  findUserByEmail: (email: string) => Promise<User | undefined>;
  findUserByEmailAndProvider: (
    email: string,
    provier: string
  ) => Promise<User | undefined>;
  findUserById: (id: string) => Promise<User | undefined>;
  updateTokens: (
    email: string,
    access_token: string,
    refresh_token: string
  ) => Promise<void>;
  getAllUsers: () => Promise<User[]>;
}

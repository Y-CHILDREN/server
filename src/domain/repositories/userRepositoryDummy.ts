import { UserDataDummy } from '../entities/UserDataDummy';

export interface UserRepositoryDummy {
  findByEmail(email: string): Promise<UserDataDummy | null>;
}

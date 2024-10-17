import { UserData } from '../entities/UserData';

export interface UserRepository {
  findByEmail(email: string): Promise<UserData | null>;
}

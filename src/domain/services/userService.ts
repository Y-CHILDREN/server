import { UserRepository } from '../repositories/userRepository';
import { UserData } from '../entities/UserData';
import { aw } from 'vitest/dist/chunks/reporters.WnPwkmgA';

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async findUserByEmail(email: string): Promise<UserData | null> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('User with email not found');
    }

    return user;
  }
}

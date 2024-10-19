import { UserRepositoryDummy } from '../repositories/userRepositoryDummy';
import { UserDataDummy } from '../entities/UserDataDummy';

export class UserServiceDummy {
  constructor(private userRepository: UserRepositoryDummy) {}

  async findUserByEmail(email: string): Promise<UserDataDummy | null> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('User with email not found');
    }

    return user;
  }
}

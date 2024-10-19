import { UserRepositoryDummy } from '../../domain/repositories/userRepositoryDummy';
import { UserDataDummy } from '../../domain/entities/UserDataDummy';

export class InMemoryUserRepositoryImpl implements UserRepositoryDummy {
  private users: UserDataDummy[] = [
    {
      id: 1,
      email: 'Hwang@naver.com',
      name: 'JaeWon',
      tripSchedule: [1, 2, 3],
      createdAt: new Date('2024-12-01'),
      updatedAt: new Date('2024-12-02'),
    },
    {
      id: 2,
      email: 'Park@gmail.com',
      name: 'JiHwan',
      tripSchedule: [1, 2],
      createdAt: new Date('2024-12-01'),
      updatedAt: new Date('2024-12-02'),
    },
  ];
  async findByEmail(email: string): Promise<UserDataDummy | null> {
    const user = this.users.find((user) => user.email === email);
    return user || null;
  }
}

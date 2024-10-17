import { UserRepository } from '../../domain/repositories/userRepository';
import { UserData } from '../../domain/entities/UserData';

export class InMemoryUserRepositoryImpl implements UserRepository {
  private users: UserData[] = [
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
  async findByEmail(email: string): Promise<UserData | null> {
    const user = this.users.find((user) => user.email === email);
    return user || null;
  }
}

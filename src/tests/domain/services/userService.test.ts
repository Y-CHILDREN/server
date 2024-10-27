import { describe, it, expect, beforeEach } from 'vitest';
import { UserService } from '../../../domain/services/userService';
import { UserRepository } from '../../../domain/repositories/userRepository';
import { User } from '../../../domain/models/user';

describe('Test UserService', () => {
  let userRepositoryMock: Partial<UserRepository>;
  let userService: ReturnType<typeof UserService>;

  beforeEach(() => {
    userRepositoryMock = {
      createUser: vi.fn(),
      findUserById: vi.fn(),
      findUserByEmail: vi.fn(),
      updateTokens: vi.fn(),
      updateUserImage: vi.fn(),
      updateUserNickname: vi.fn(),
      updateUserMemo: vi.fn(),
      getAllUsers: vi.fn(),
      deleteUser: vi.fn(),
    };

    userService = UserService(userRepositoryMock as UserRepository);
  });

  describe('Test UserService.createUser', () => {
    test('유저를 생성하고 반환한다.', async () => {
      //Given

      const mockUser: Omit<User, 'id'> = {
        email: 'test@gmail.com',
        provider: 'google',
        user_image: 'test.webp',
        nickname: 'tester',
        user_memo: 'hello world!',
        access_token: 'access_token_value',
        refresh_token: 'refresh_token_value',
        trip_history: [],
      };
      (userRepositoryMock.createUser as any).mockResolvedValue(mockUser);

      const result = await userService.createUser(mockUser);

      //when
      expect(userRepositoryMock.createUser).toHaveBeenCalledWith(mockUser);

      //then
      expect(result).toEqual(mockUser);
    });
  });
});

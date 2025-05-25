import { describe, it, expect, beforeEach } from 'vitest';
import { UserService } from '../../../domain/services/userService';
import { UserRepository } from '../../../domain/repositories/userRepository';
import { User } from '../../../domain/models/user';
import { UserDto } from '../../../data/dtos/user/userDto';

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
      // //Given
      //
      // const mockUser: Omit<User, 'id'> = {
      //   email: 'test@gmail.com',
      //   provider: 'google',
      //   user_image: 'test.webp',
      //   nickname: 'tester',
      //   user_memo: 'hello world!',
      //   access_token: 'access_token_value',
      //   refresh_token: 'refresh_token_value',
      //   trip_history: [],
      // };
      // (userRepositoryMock.createUser as any).mockResolvedValue(mockUser);
      //
      // const result = await userService.createUser(mockUser);
      //
      // //when
      // expect(userRepositoryMock.createUser).toHaveBeenCalledWith(mockUser);
      //
      // //then
      // expect(result).toEqual(mockUser);
    });
  });

  describe('Test UserService.findUserId', () => {
    test('가입되어 있는 유저의 id를 찾을 수 있다.', async () => {
      // const mockUser: UserDto = {
      //   id: '777',
      //   email: 'test@gmail.com',
      //   provider: 'google',
      //   user_image: 'test.webp',
      //   nickname: 'tester',
      //   user_memo: 'hello world!',
      //   trip_history: [],
      // };
      // (userRepositoryMock.findUserById as any).mockResolvedValue(mockUser);
      //
      // //when
      // const result = await userService.findUserById('777');
      //
      // //Then
      // expect(userRepositoryMock.findUserById).toHaveBeenCalledWith('777');
      // expect(result).toEqual(mockUser);
    });
  });
  describe('Test UserService.findUserEmail', () => {
    test('가입되어 있는 유저의 email을 찾을 수 있다.', async () => {
      // const mockUser: UserDto = {
      //   id: '777',
      //   email: 'test@gmail.com',
      //   provider: 'google',
      //   user_image: 'test.webp',
      //   nickname: 'tester',
      //   user_memo: 'hello world!',
      //
      //   trip_history: [],
      // };
      // (userRepositoryMock.findUserByEmail as any).mockResolvedValue(mockUser);
      //
      // //when
      // const result = await userService.findUserByEmail('test@gmail.com');
      //
      // //Then
      // expect(userRepositoryMock.findUserByEmail).toHaveBeenCalledWith(
      //   'test@gmail.com',
      // );
      // expect(result).toEqual(mockUser);
    });
  });
});

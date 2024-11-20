import { User } from '../models/user';
import { UserDto } from '../../data/dtos/user/userDto';
import { UserRepository } from '../repositories/userRepository';

const userDto = (user: User): UserDto => {
  return {
    id: user.id,
    provider: user.provider,
    email: user.email,
    user_image: user.user_image,
    nickname: user.nickname,
    user_memo: user.user_memo,
    trip_history: user.trip_history,
  };
};

export const UserService = (userRepository: UserRepository) => {
  const createUser = async (userData: Omit<User, 'id'>) => {
    return await userRepository.createUser(userData);
  };

  const findUserById = async (id: string): Promise<UserDto | null> => {
    const user = await userRepository.findUserById(id);
    if (user) {
      return userDto(user);
    }
    return null;
  };

  const findUserByEmail = async (email: string): Promise<UserDto | null> => {
    const user = await userRepository.findUserByEmail(email);
    if (user) {
      return userDto(user);
    }
    return null;
  };

  const findUsersByEmail = async (email: string) => {
    return await userRepository.findUsersByEmail(email);
  };

  const findUserByEmailAndProvider = async (
    email: string,
    provider: string,
  ) => {
    return await userRepository.findUserByEmailAndProvider(email, provider);
  };

  const updateTokens = async (
    email: string,
    access_token: string,
    refresh_token: string,
  ) => {
    await userRepository.updateTokens(email, access_token, refresh_token);
  };

  const updateUserImage = async (id: string, user_image: string) => {
    return await userRepository.updateUserImage(id, user_image);
  };
  const updateUserNickname = async (id: string, nickname: string) => {
    return await userRepository.updateUserNickname(id, nickname);
  };
  const updateUserMemo = async (id: string, user_memo: string) => {
    return await userRepository.updateUserMemo(id, user_memo);
  };

  const getAllUsers = async () => {
    return await userRepository.getAllUsers();
  };

  const deleteUser = async (id: string) => {
    return await userRepository.deleteUser(id);
  };

  return {
    createUser,
    findUserById,
    findUserByEmail,
    findUsersByEmail,
    findUserByEmailAndProvider,
    updateUserImage,
    updateUserNickname,
    updateUserMemo,
    updateTokens,
    getAllUsers,
    deleteUser,
  };
};

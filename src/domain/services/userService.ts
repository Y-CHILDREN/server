import { User } from '../models/user';
import { UserRepository } from '../repositories/userRepository';

export const UserService = (userRepository: UserRepository) => {
  const createUser = async (userData: Omit<User, 'id'>) => {
    return await userRepository.createUser(userData);
  };

  const findUserById = async (id: string) => {
    return await userRepository.findUserById(id);
  };

  const findUserByEmail = async (email: string) => {
    return await userRepository.findUserByEmail(email);
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
    findUserByEmailAndProvider,
    updateUserImage,
    updateUserNickname,
    updateUserMemo,
    updateTokens,
    getAllUsers,
    deleteUser,
  };
};

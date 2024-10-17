import { User } from '../models/user';
import { UserRepository } from '../models/userRepository';

export const createUserService = (userRepository: UserRepository) => {
  const createUser = async (userData: Omit<User, 'id'>) => {
    return await userRepository.createUser(userData);
  };

  const findUserByEmail = async (email: string) => {
    return await userRepository.findUserByEmail(email);
  };

  const findUserById = async (id: string) => {
    return await userRepository.findUserById(id);
  };

  const updateTokens = async (
    email: string,
    access_token: string,
    refresh_token: string
  ) => {
    await userRepository.updateTokens(email, access_token, refresh_token);
  };

  const getAllUsers = async () => {
    return await userRepository.getAllUsers();
  };

  return {
    createUser,
    findUserByEmail,
    findUserById,
    updateTokens,
    getAllUsers,
  };
};

import fs from 'fs';
import path from 'path';
import { User } from '../../domain/models/user';
import { UserRepository } from '../../domain/models/userRepository';

export const userDataLocalRepository = (): UserRepository => {
  const filePath = path.join(__dirname, './userData.json');

  // userData.json 파일을 읽는 함수
  const readUsersData = (): Promise<User[]> => {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
          if (err.code === 'ENOENT') {
            resolve([]);
          } else {
            reject(err);
          }
        } else {
          resolve(JSON.parse(data));
        }
      });
    });
  };

  // userData.json에 데이터를 입력하는 함수
  const writeUsersData = (users: User[]): Promise<void> => {
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
        if (err) {
          console.error(`Error writing to file: ${filePath}`, err);
          reject(new Error('파일에 데이터를 저장하는 중 문제가 발생했습니다.'));
        } else {
          resolve();
        }
      });
    });
  };

  // 유저 생성함수
  const createUser = async (userData: Omit<User, 'id'>): Promise<User> => {
    const users = await readUsersData();
    const newUser: User = {
      id: String(users.length + 1),
      ...userData,
    };
    users.push(newUser);
    await writeUsersData(users);
    console.log('새로운 유저가 등록되었습니다.:', newUser);
    return newUser;
  };

  // 유저 이메일로 유저를 체크하는 함수
  const findUserByEmail = async (email: string): Promise<User | undefined> => {
    const users = await readUsersData();
    return users.find((user) => user.email === email);
  };

  // 유저 이메일과 provider(유저 가입 플랫품)로 유저를 체크하는 함수
  const findUserByEmailAndProvider = async (
    email: string,
    provider: string,
  ): Promise<User | undefined> => {
    const users = await readUsersData();
    return users.find(
      (user) => user.email === email && user.provider === provider,
    );
  };

  // id로 유저를 체크하는 함수
  const findUserById = async (id: string): Promise<User | undefined> => {
    const users = await readUsersData();
    return users.find((user) => user.id === id);
  };

  // 유저 이미지를 수정하는 함수
  const updateUserImage = async (id: string, user_image: string) => {
    const users = await readUsersData();
    const user = users.find((user) => user.id === id);
    if (user) {
      user.user_image = user_image;
      await writeUsersData(users);
      console.log('유저 이미지를 수정했습니다.');
      return user;
    } else {
      console.log('유저 이미지 업데이트에 실패했습니다.');
      return undefined;
    }
  };

  // 유저 닉네임을 수정하는 함수
  const updateUserNickname = async (id: string, nickname: string) => {
    const users = await readUsersData();
    const user = users.find((user) => user.id === id);
    if (user) {
      user.nickname = nickname;
      await writeUsersData(users);
      console.log('유저 닉네임이 업데이트 됐습니다.');
      return user;
    }
    console.log('유저 닉네임 업데이트에 실패했습니다.');
    return undefined;
  };

  //유저 메모를 수정한느 함수
  const updateUserMemo = async (id: string, user_memo: string) => {
    const users = await readUsersData();
    const user = users.find((user) => user.id === id);
    if (user) {
      user.user_memo = user_memo;
      await writeUsersData(users);
      console.log('유저 메모를 수정했습니다.');
      return user;
    } else {
      console.log('유저 메모 업데이트에 실패했습니다.');
      return undefined;
    }
  };

  //로그인시 유저 토큰 생성하는 함수
  const updateTokens = async (
    email: string,
    access_token: string,
    refresh_token: string,
  ): Promise<void> => {
    const users = await readUsersData();
    const user = users.find((user) => user.email === email);
    if (user) {
      user.access_token = access_token;
      user.refresh_token = refresh_token;
      await writeUsersData(users);
    }
  };

  // 유저를 호출하는 함수
  const getAllUsers = async (): Promise<User[]> => {
    return await readUsersData();
  };

  return {
    createUser,
    findUserByEmail,
    findUserByEmailAndProvider,
    findUserById,
    updateUserImage,
    updateUserNickname,
    updateUserMemo,
    updateTokens,
    getAllUsers,
  };
};

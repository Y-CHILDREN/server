interface User {
  id: string;
  email: string;
  user_image: string;
  profile: string;
  accessToken: string;
  refreshToken: string;
}

let users: User[] = [];

export const createUser = (userData: Omit<User, 'id'>): User => {
  const newUser: User = {
    id: String(users.length + 1),
    ...userData,
  };
  users.push(newUser);
  return newUser;
};

export const findUserByEmail = (email: string): User | undefined => {
  return users.find((user) => user.email === email);
};

export const updateTokens = (
  email: string,
  accessToken: string,
  refreshToken: string
) => {
  const user = findUserByEmail(email);
  if (user) {
    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
  }
};

export const getAllUser = (): User[] => {
  return users;
};

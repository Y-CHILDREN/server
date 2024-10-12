interface User {
  id: string;
  email: string;
  user_image: string;
  profile: string;
  access_token: string;
  refresh_token: string;
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

export const findUserById = (id: string): User | undefined => {
  return users.find((user) => user.id === id);
};

export const updateTokens = (
  email: string,
  access_token: string,
  refresh_token: string
) => {
  const user = findUserByEmail(email);
  if (user) {
    user.access_token = access_token;
    user.refresh_token = refresh_token;
  }
};

export const getAllUser = (): User[] => {
  return users;
};

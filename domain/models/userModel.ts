interface User {
  id: string;
  email: string;
  user_image: string;
  profile: string;
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

export const findUserByNickName = (email: string): User | undefined => {
  return users.find((user) => user.email === email);
};

export const getAllUser = (): User[] => {
  return users;
};

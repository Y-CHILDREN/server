import fs from 'fs';
import path from 'path';
import { User } from '../../domain/repositories/userModel';

const userDataLocalRepository = (userData: User) => {
  const filePath = path.join(__dirname, './userData.json');

  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      return fs.writeFile(
        filePath,
        JSON.stringify([userData], null, 2),
        (writeErr) => {
          if (writeErr) {
            throw writeErr;
          }
          console.log('유저 데이터가 등록되었습니다.');
        }
      );
    }

    const users = JSON.parse(data);
    users.push(userData);

    fs.writeFile(filePath, JSON.stringify(users, null, 2), (writeErr) => {
      if (writeErr) {
        throw writeErr;
      }
      console.log('유저 데이터가 업데이트 되었습니다.');
    });
  });
};
export default userDataLocalRepository;

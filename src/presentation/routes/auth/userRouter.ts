import { Router } from 'express';
import { userDataLocalRepository } from '../../../data/repositorylmpls/localUserRepositoryImpl';

const userRouter = Router();
const userRepository = userDataLocalRepository();

userRouter.get('/users', async (req, res) => {
  try {
    const users = await userRepository.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: '유저 정보를 가져오는데 실패 했습니다.' });
  }
});

export default userRouter;

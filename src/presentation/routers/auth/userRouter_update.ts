import { Router } from 'express';
import {
  deleteUser,
  findUserByEmail,
  findUsersByEmail,
  getUserById,
  logout,
} from '../../controllers/userController_update';

const userRouter = Router();

userRouter.get('/:id', getUserById);

userRouter.get('/email/:email', findUserByEmail);

// 조건 검색 라우트
userRouter.get('/emails/:email', findUsersByEmail);

userRouter.post('/logout', logout);

userRouter.delete('/:id', (req, res) => {
  deleteUser(req, res);
});

export default userRouter;

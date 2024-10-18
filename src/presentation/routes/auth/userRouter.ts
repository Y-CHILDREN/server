import { Router } from 'express';
import {
  getUserById,
  updateUserMemo,
  updateUserNickname,
} from '../../controllers/userController';

const userRouter = Router();

userRouter.get('/:id', getUserById);

userRouter.patch('/:id/nickname', (req, res) => {
  updateUserNickname(req, res);
});

userRouter.patch('/:id/usermemo', (req, res) => {
  updateUserMemo(req, res);
});

export default userRouter;

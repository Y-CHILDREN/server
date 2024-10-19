import { Router } from 'express';
import {
  getUserById,
  updateUserMemo,
  updateUserNickname,
  uploadMiddleware,
  updatedUserIamge,
} from '../../controllers/userController';

const userRouter = Router();

userRouter.get('/:id', getUserById);

userRouter.patch('/:id/nickname', (req, res) => {
  updateUserNickname(req, res);
});

userRouter.patch('/:id/memo', (req, res) => {
  updateUserMemo(req, res);
});

userRouter.patch('/:id/image', uploadMiddleware, updatedUserIamge);

export default userRouter;

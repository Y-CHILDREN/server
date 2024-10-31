import { Router } from 'express';
import {
  deleteUser,
  findUserByEmail,
  getUserById,
  updateUserImage,
  updateUserMemo,
  updateUserNickname,
} from '../../controllers/userController';

const userRouter = Router();

userRouter.get('/:id', getUserById);

userRouter.get('/email/:email', findUserByEmail);

userRouter.patch('/:id/nickname', (req, res) => {
  updateUserNickname(req, res);
});

userRouter.patch('/:id/memo', (req, res) => {
  updateUserMemo(req, res);
});

userRouter.patch('/:id/image', (req, res) => {
  updateUserImage(req, res);
});

userRouter.delete('/:id', (req, res) => {
  deleteUser(req, res);
});

export default userRouter;

import { Request, Response } from 'express';
import { userDataLocalRepository } from '../../data/repositoryImpls/localUserRepositoryImpl';

const userRepository = userDataLocalRepository();

export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const { id } = req.params;

  try {
    const user = await userRepository.findUserById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: '유저를 찾을 수 없습니다.' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: '유저 정보를 가져오는 중 오류가 발생했습니다.' });
  }
};

export const updateUserNickname = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nickname } = req.body;

  if (!nickname) {
    return res.status(400).json({ message: '닉네임을 입력해주세요' });
  }

  try {
    const updatedUserNickname = await userRepository.updateUserNickname(
      id,
      nickname
    );

    if (updatedUserNickname) {
      res.json({
        message: '유저 닉네임이 업데이트 되었습니다.',
        user: updatedUserNickname,
      });
    } else {
      res.status(404).json({ message: '유저를 찾을 수 없습니다.' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: '닉네임 업데이트 중 오류가 발생했습니다.' });
  }
};

export const updateUserMemo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { user_memo } = req.body;

  try {
    const updatedUserMemo = await userRepository.updateUserMemo(id, user_memo);

    if (updatedUserMemo) {
      res.json({
        message: '유저 메모가 업데이트 되었습니다.',
        user: updatedUserMemo,
      });
    } else {
      res.status(404).json({ message: '유저를 찾을 수 없습니다.' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: '메모 업데이트 중 오류가 발생했습니다.' });
  }
};

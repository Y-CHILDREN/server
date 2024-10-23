import { Request, Response } from 'express';
import { UserService } from '../../domain/services/userService';

import multer from 'multer';
import sharp from 'sharp';
import fs from 'fs';

import AWS from 'aws-sdk';

AWS.config.update({
  region: 'ap-northeast-2a',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
});

const s3 = new AWS.S3();

export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const userService = req.app.get('userService') as ReturnType<
    typeof UserService
  >;
  const { id } = req.params;

  try {
    const user = await userService.findUserById(id);
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
  const userService = req.app.get('userService') as ReturnType<
    typeof UserService
  >;
  const { id } = req.params;
  const { nickname } = req.body;

  if (!nickname) {
    return res.status(400).json({ message: '닉네임을 입력해주세요' });
  }

  try {
    const updatedUserNickname = await userService.updateUserNickname(
      id,
      nickname,
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
  const userService = req.app.get('userService') as ReturnType<
    typeof UserService
  >;
  const { id } = req.params;
  const { user_memo } = req.body;

  try {
    const updatedUserMemo = await userService.updateUserMemo(id, user_memo);

    if (updatedUserMemo) {
      res.json({
        message: '유저 메모가 업데이트 되었습니다.',
        user: updatedUserMemo,
      });
    } else {
      res.status(404).json({ message: '유저를 찾을 수 없습니다.' });
    }
  } catch (error) {
    res.status(500).json({ message: '메모 업데이트 중 오류가 발생했습니다.' });
  }
};

export const updateUserImage = async (req: Request, res: Response) => {
  const userService = req.app.get('userService') as ReturnType<
    typeof UserService
  >;
  const { id } = req.params;
  const imageFilepath =
    '/Users/jeontaejeong/Documents/Coding/Project/TripApp/server/src/public/assets';

  const storage = multer.memoryStorage();
  const upload = multer({ storage: storage });

  upload.single('user_image')(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: '이미지 업로드 오류 발생' });
    }

    if (!req.file) {
      return res.status(400).json({ message: '이미지 파일이 필요합니다.' });
    }

    if (!fs.existsSync(imageFilepath)) {
      fs.mkdirSync(imageFilepath, { recursive: true });
    }

    try {
      const user = await userService.findUserById(id);
      if (!user) {
        return res.status(404).json({ message: '유저를 찾을 수 없습니다.' });
      }

      const fileName = `${id}_${Date.now()}.webp`;
      const filePath = `${imageFilepath}/${fileName}`;
      const imageUrl = `http://localhost:3000/assets/${fileName}`;

      await sharp(req.file.buffer).webp({ quality: 70 }).toFile(filePath);

      const updatedUser = await userService.updateUserImage(id, imageUrl);

      if (!updatedUser) {
        return res.status(404).json({ message: '유저를 찾을 수 없습니다.' });
      }

      res.json({
        message: '유저 이미지가 업데이트 됐습니다.',
        user: updateUserImage,
      });
    } catch (error) {
      console.error('이미지 저장 오류:', error);
      res.status(500).json({ message: '이미지 변화 및 저장에 실패 했습니다.' });
    }
  });
};

import { Request, Response } from 'express';
import { UserService } from '../../domain/services/userService';

import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';

import path from 'path';

import dotenv from 'dotenv';

dotenv.config();

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

// 유저 이미지 업데이트

export const updateUserImage = async (req: Request, res: Response) => {
  const userService = req.app.get('userService') as ReturnType<
    typeof UserService
  >;
  const { id } = req.params;

  const s3 = new S3Client({
    region: process.env.AWS_REGION as string,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
  });

  const allowedExtensions = ['.png', '.jpg', '.jpeg', '.webp'];

  const uploadImage = multer({
    storage: multerS3({
      s3: s3,
      bucket: process.env.AWS_S3_BUCKET_NAME as string,
      acl: 'public-read',
      key: function (req, file, cb) {
        const fileExtension = path.extname(file.originalname).toLowerCase();
        if (!allowedExtensions.includes(fileExtension)) {
          return cb(new Error('가능한 파일 확장자가 아닙니다.'), '');
        }
        const fileName = `${id}_userImage_${Date.now()}.webp`;
        cb(null, `userImage/${fileName}`);
      },
      contentType: multerS3.AUTO_CONTENT_TYPE,
    }),
  });

  uploadImage.single('user_image')(req, res, async (err) => {
    if (err) {
      console.log(err.message);
      return res
        .status(500)
        .json({ message: '이미지 업로드 오류 발생했습니다.' });
    }

    if (!req.file) {
      return res.status(400).json({ message: '이미지 파일을 첨부해주세요' });
    }

    try {
      const user = await userService.findUserById(id);
      if (!user) {
        return res.status(400).json({ message: '유저를 찾을 수 없습니다.' });
      }

      const imageUrl = (req.file as any).location;

      const updatedUser = await userService.updateUserImage(id, imageUrl);

      if (!updatedUser) {
        return res.status(404).json({ message: '유저를 찾을 수 없습니다.' });
      }

      res.json({
        message: '유저 이미지가 업데이트 되었습니다.',
        user: updatedUser,
      });
    } catch (error) {
      console.error('이미지 저장 오류', error);
      res.status(500).json({ message: '이미지 업로드에 실패 했습니다.' });

    }
  });
};
// 유저 삭제 함수
export const deleteUser = async (req: Request, res: Response) => {
  const userService = req.app.get('userService') as ReturnType<
    typeof UserService
  >;
  const { id } = req.params;

  try {
    const user = await userService.findUserById(id);
    if (!user) {
      return res.status(404).json({ message: '유저를 찾을 수 없습니다.' });
    }

    const isDeleted = await userService.deleteUser(id);
    if (!isDeleted) {
      return res.status(500).json({ message: '유저 삭제에 실패했습니다.' });
    }

    res.json({ message: '유저가 성공적으로 삭제되었습니다.' });
  } catch (error) {
    console.error('유저 삭제 오류:', error);
    res.status(500).json({ message: '유저 삭제 중 오류가 발생했습니다.' });
  }

    }
  });
};

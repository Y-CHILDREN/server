import { Request, Response } from 'express';
import { UserService } from '../../domain/services/userService_update';

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

export const findUserByEmail = async (
  req: Request<{ email: string }>,
  res: Response,
) => {
  const userService = req.app.get('userService') as ReturnType<
    typeof UserService
  >;
  const { email } = req.params;
  try {
    const user = await userService.findUserByEmail(email);
    if (user) {
      res.status(200).json(user);
    } else {
      res
        .status(404)
        .json({ message: '해당 이메일로 유저를 찾을 수 없습니다.' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: '이메일로 유저를 찾는 중 오류가 발생했습니다.' });
  }
};

export const findUsersByEmail = async (
  req: Request<{ email: string }>,
  res: Response,
) => {
  const userService = req.app.get('userService') as ReturnType<
    typeof UserService
  >;
  const { email } = req.params;
  try {
    const users = await userService.findUsersByEmail(email);
    if (users) {
      res.status(200).json(users);
    } else {
      res
        .status(404)
        .json({ message: '해당 이메일로 유저를 찾을 수 없습니다.' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: '이메일로 유저를 찾는 중 오류가 발생했습니다.' });
  }
};

export const findUsersByEmails = async (req: Request, res: Response) => {
  const userService = req.app.get('userService') as ReturnType<
    typeof UserService
  >;

  const { emails } = req.body;

  if (!Array.isArray(emails) || emails.length === 0) {
    res.status(400).json({ message: 'emails must be an array.' });
    return;
  }

  try {
    const users = await userService.findUsersByEmails(emails);
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users by emails:', error);
    res.status(500).json({ message: '유저 정보 조회 중 오류 발생' });
  }
};

export const findUserByEmailAndProvider = async (
  req: Request,
  res: Response,
) => {
  const userService = req.app.get('userService') as ReturnType<
    typeof UserService
  >;
  const { email, provider } = req.body;
  try {
    const user = await userService.findUserByEmailAndProvider(email, provider);
    if (user) {
      res.status(200).json(user);
    } else {
      res
        .status(404)
        .json({ message: '해당 이메일과 provider로 유저를 찾을 수 없습니다.' });
    }
  } catch (error) {
    res.status(500).json({
      message: '이메일과 provider로 유저를 찾는 중 오류가 발생했습니다.',
    });
  }
};

export const getUserSearchHandler = async (req: Request, res: Response) => {
  const userService = req.app.get('userService') as ReturnType<
    typeof UserService
  >;

  const query = req.query.query as string;

  if (!query || query.trim() === '') {
    res.status(400).json({ message: 'Query is required' });
    return;
  }

  try {
    const users = await userService.searchUsersByEmail(query);
    res.json(users);
  } catch (error) {
    console.error('Error searching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const logout = (req: Request, res: Response) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        console.error('세션 삭제 오류:', err);
        return res.status(500).json({
          success: false,
          message: '로그아웃 처리 중 오류가 발생했습니다.',
        });
      }

      res.clearCookie('connect.sid');
      res.status(200).json({
        success: true,
        message: '로그아웃이 성공적으로 완료되었습니다.',
      });
    });
  } else {
    res.status(200).json({
      success: true,
      message: '로그아웃이 성공적으로 완료되었습니다.',
    });
  }
};

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
};

import { Request, Response, NextFunction } from 'express';
import * as UserRepository from '../repositories/UserRepository';
import passport from 'passport';
import bcrypt from 'bcrypt';
import resFormat from '../utils/resFormat';

export const SignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const checkEmail = await UserRepository.findByEmail(req.body.email);
    if (checkEmail) {
      return res.send(resFormat.fail(409, '이미 존재하는 이메일입니다.'));
    }
    const checkName = await UserRepository.findByName(req.body.name);
    if (checkName) {
      return res.send(resFormat.fail(409, '이미 존해하는 닉네임입니다.'));
    }
    const data = req.body;
    data.password = await bcrypt.hash(req.body.password, 10);
    const response = await UserRepository.create(data);
    if (!response) {
      return res.send(resFormat.fail(400, '실패'));
    }
    return res.send(resFormat.successData(200, '회원가입 성공', response));
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const LogIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate('local', (err: any, user: any, info: any) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.send(resFormat.fail(400, '일치하는 사용자가 없습니다.'));
    }
    req.login(user, (err) => {
      if (err) {
        //passport login 실행단계
        console.error(err);
        next(err);
      }
      const data = user;
      delete data.password;
      res.json(resFormat.successData(200, '로그인 성공', data));
    });
  })(req, res, next);
};

export const LogOut = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.logout((err) => {
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        next(err);
      } else {
        res.clearCookie('connect.sid');
        return res.send(resFormat.success(200, '로그아웃 성공'));
      }
    });
  });
};

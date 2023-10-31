import express, { Request, Response } from 'express';
import * as UserService from '../services/UserService';
import * as UserRepository from '../repositories/UserRepository';
import * as UserValidation from '../validation/UserValidation';

const Router = express.Router();

// 회원가입
Router.post('/', UserValidation.SignUpRequestValid, UserService.SignUp);

// 로그인
Router.post('/login', UserValidation.LoginRequestValid, UserService.LogIn);

// 로그아웃
Router.get('/logout', UserService.LogOut);

// 회원 정보 가져오기
Router.get('/:id', async function (req: Request, res: Response) {
  try {
    const response = await UserRepository.findById(1);
    res.send(response);
  } catch (err) {
    console.log(err);
  }
});

// 로그인 테스트
Router.get('/', function (req: Request, res: Response) {
  console.log(req.user);
  if (req.isAuthenticated() && req.user) {
    return res.json({ user: req.user });
  }
  return res.json({ user: null });
});

export default Router;

import express, { Request, Response } from 'express';
import * as UserService from '../services/UserService';
import * as UserRepository from '../repositories/UserRepository';
import * as UserValidation from '../validation/UserValidation';
import * as UserHandler from '../middlewares/UserHandler';

const Router = express.Router();

// 회원가입
Router.post('/', UserValidation.SignUpRequestValid, UserService.SignUp);

// 로그인
Router.post(
  '/login',
  UserHandler.isNotLoggedIn,
  UserValidation.LoginRequestValid,
  UserService.LogIn
);

// 로그아웃
Router.get('/logout', UserHandler.isLoggedIn, UserService.LogOut);

// 회원 정보 가져오기
Router.get('/:id', async function (req: Request, res: Response) {
  try {
    const response = await UserRepository.findById(parseInt(req.params.id, 10));
    res.send(response);
  } catch (err) {
    console.log(err);
  }
});

// seed 값 변경
Router.patch(
  '/seed',
  UserHandler.isLoggedIn,
  UserValidation.SeedRequestValid,
  UserService.ChangeSeed
);

// 로그인 중인거 확인
Router.get('/', UserHandler.isLoggedIn, (req: Request, res: Response) => {
  return res.status(200).send(req.user);
});

export default Router;

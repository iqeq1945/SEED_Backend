import express, { Request, Response } from 'express';
import * as RedisRepository from '../repositories/RedisRepository';
import * as RedisService from '../services/RedisService';
import * as RedisValidation from '../validation/RedisValidation';
import * as UserHandler from '../middlewares/UserHandler';
import * as BookHandler from '../middlewares/BookHandler';

const Router = express.Router();

Router.get('/', async (req: Request, res: Response) => {
  const response = await RedisRepository.setLike(12, 5);
  res.json(response);
});

// 좋아요 정보 가져오기
Router.get(
  '/like/:bookId',
  RedisValidation.LikeRequestValid,
  BookHandler.existBook,
  RedisService.GetLike
);

// 좋아요 기능 하기
Router.post(
  '/like',
  UserHandler.isLoggedIn,
  BookHandler.existBook,
  RedisService.SetLike
);
export default Router;

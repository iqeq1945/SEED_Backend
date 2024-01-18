import express from 'express';
import * as RedisService from '../services/RedisService';
import * as RedisValidation from '../validation/RedisValidation';
import * as UserHandler from '../middlewares/UserHandler';
import * as BookHandler from '../middlewares/BookHandler';

const Router = express.Router();

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

// 최근 검색 목록등록
Router.post(
  '/keyword',
  RedisValidation.KeywrodRequestValid,
  RedisService.SetKeyword
);

//최근 검색 목록 가져오기
Router.get('/keyword', UserHandler.isLoggedIn, RedisService.GetKeyword);

export default Router;

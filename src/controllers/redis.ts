import express, { Request, Response } from 'express';
import * as RedisService from '../services/RedisService';
import * as RedisValidation from '../validation/RedisValidation';
import * as UserHandler from '../middlewares/UserHandler';
import * as BookHandler from '../middlewares/BookHandler';
import * as BookItemHandler from '../middlewares/BookItemHandler';

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
  RedisValidation.LikeRequestValid,
  BookHandler.existBook,
  RedisService.SetLike
);

// 좋아요 기능 취소
Router.delete(
  '/like/:bookId',
  UserHandler.isLoggedIn,
  RedisValidation.LikeRequestValid,
  RedisService.DelLike
);

// 최근 검색 목록등록
Router.post(
  '/keyword',
  UserHandler.isLoggedIn,
  RedisValidation.KeywordRequestValid,
  RedisService.SetKeyword
);

//최근 검색 목록 가져오기
Router.get('/keyword', UserHandler.isLoggedIn, RedisService.GetKeyword);

//최근 검색 목록 삭제 (query:value)있을시 해당 값 삭제 / 없을시 제일오래된거 삭제
Router.delete(
  '/keyword',
  UserHandler.isLoggedIn,
  RedisValidation.DelKeywordRequestValid,
  RedisService.DelKeyword
);

// 조회수 등록
Router.post(
  '/view',
  UserHandler.isLoggedIn,
  RedisValidation.ViewRequestValid,
  BookItemHandler.checkBook,
  RedisService.SetView
);

// 조회수 확인
Router.get(
  '/view/:bookId',
  RedisValidation.GetViewRequestValid,
  BookHandler.existBook,
  RedisService.GetView
);

Router.post('/notification', RedisService.SetNotification);
export default Router;

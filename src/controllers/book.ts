import express, { Request, Response } from 'express';
import * as BookService from '../services/BookService';
import * as BookValidation from '../validation/BookValidation';
import * as UserHandler from '../middlewares/UserHandler';
import * as BookHandler from '../middlewares/BookHandler';

const Router = express.Router();

// Book 생성
Router.post(
  '/',
  UserHandler.isLoggedIn,
  BookValidation.CreateRequestValid,
  BookService.CreateBook
);

// Book 삭제
Router.post(
  '/delete',
  UserHandler.isLoggedIn,
  BookValidation.DeleteRequestValid,
  BookHandler.checkAuthor,
  BookService.DeleteBook
);

// Book 수정
Router.patch(
  '/update',
  UserHandler.isLoggedIn,
  BookValidation.UpdateRequestValid,
  BookHandler.checkAuthor,
  BookService.UpdateBook
);

// Book 정보 가져오기
Router.get('/info/:id', BookValidation.ReadRequestValid, BookService.ReadBook);

// Book Query로 검색
Router.get(
  '/list',
  BookValidation.ListsQueryValidation,
  BookService.GetListQuery
);

// Book 권한 확인 테스트
Router.post('/check', BookHandler.checkAuthor, function (req, res) {
  return res.send('성공');
});

export default Router;

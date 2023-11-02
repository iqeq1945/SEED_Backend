import express, { Request, Response } from 'express';
import * as BookService from '../services/BookService';
import * as BookValidation from '../validation/BookValidation';
import * as UserHandler from '../middlewares/UserHandler';

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
  BookService.DeleteBook
);

// Book 수정

Router.patch(
  '/update',
  UserHandler.isLoggedIn,
  BookValidation.UpdateRequestValid,
  BookService.UpdateBook
);
export default Router;

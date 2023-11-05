import express, { Request, Response } from 'express';
import * as BookItemValidation from '../validation/BookItemValidation';
import * as BookItemService from '../services/BookItemService';
import * as BookHandler from '../middlewares/BookHandler';
import * as UserHandler from '../middlewares/UserHandler';

const Router = express.Router();

// Book Item 생성

// Book 생성
Router.post(
  '/',
  UserHandler.isLoggedIn,
  BookHandler.checkAuthor,
  BookItemValidation.CreateRequestValid,
  BookItemService.CreateItem
);

// Book 삭제

Router.post(
  '/delete',
  UserHandler.isLoggedIn,
  BookHandler.checkAuthor,
  BookItemValidation.DeleteRequestValid,
  BookItemService.DeleteItem
);

// Book 수정

Router.post(
  '/update',
  UserHandler.isLoggedIn,
  BookHandler.checkAuthor,
  BookItemValidation.UpdateRequestValid,
  BookItemService.UpdateItem
);

export default Router;

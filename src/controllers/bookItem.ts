import express, { Request, Response } from 'express';
import * as BookItemValidation from '../validation/BookItemValidation';
import * as BookItemService from '../services/BookItemService';
import * as BookHandler from '../middlewares/BookHandler';
import * as BookItemHandler from '../middlewares/BookItemHandler';
import * as UserHandler from '../middlewares/UserHandler';
const Router = express.Router();

// Book Item 생성
Router.post(
  '/',
  UserHandler.isLoggedIn,
  BookItemValidation.CreateRequestValid,
  BookHandler.checkAuthor,
  BookItemService.CreateItem
);

// Book Item 삭제
Router.post(
  '/delete',
  UserHandler.isLoggedIn,
  BookItemValidation.DeleteRequestValid,
  BookItemHandler.checkAuthor,
  BookItemService.DeleteItem
);

// Book Item 수정
Router.patch(
  '/update',
  UserHandler.isLoggedIn,
  BookItemValidation.UpdateRequestValid,
  BookItemHandler.checkAuthor,
  BookItemService.UpdateItem
);

Router.get(
  '/:id',
  BookItemValidation.ReadRequestValid,
  BookItemService.GetItem
);

Router.post(
  '/open',
  UserHandler.isAdmin,
  BookItemValidation.OpenRequestValid,
  BookItemHandler.existBookItem,
  BookItemService.OpenItem
);

export default Router;

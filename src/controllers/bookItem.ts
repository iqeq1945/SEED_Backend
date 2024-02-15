import express from 'express';
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

// Book Item 정보 얻기
Router.get(
  '/:id',
  BookItemValidation.ReadRequestValid,
  BookItemService.GetItem
);

// Book Open 설정
Router.post(
  '/open',
  UserHandler.isAdmin,
  BookItemValidation.OpenRequestValid,
  BookItemHandler.existBookItem,
  BookItemService.OpenItem
);

export default Router;

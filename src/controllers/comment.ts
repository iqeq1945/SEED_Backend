import express from 'express';
import * as CommentValidation from '../validation/CommentValidation';
import * as CommentService from '../services/CommentService';
import * as UserHandler from '../middlewares/UserHandler';
import * as CommentHandler from '../middlewares/CommentHandler';

const Router = express.Router();

Router.post(
  '/',
  UserHandler.isLoggedIn,
  CommentValidation.CreateRequestValid,
  CommentService.CreateComment
);

Router.patch(
  '/',
  UserHandler.isLoggedIn,
  CommentValidation.UpdateRequestValid,
  CommentHandler.checkAuthor,
  CommentService.UpdateComment
);

Router.delete(
  '/:id',
  UserHandler.isLoggedIn,
  CommentValidation.DeleteRequestValid,
  CommentHandler.checkAuthor,
  CommentService.DeleteComment
);

Router.get(
  '/user/:userId',
  CommentValidation.GetByUserRequestValid,
  CommentService.GetCommentByUser
);

Router.get(
  '/book/:bookId',
  CommentValidation.GetByBookRequestValid,
  CommentService.GetCommentByBook
);

Router.get(
  '/book-item/:bookItemId',
  CommentValidation.GetByBookItemRequestValid,
  CommentService.GetCommentByBookItem
);

export default Router;

import { check } from 'express-validator';
import validationFunction from './validationFunction';
import { Request, Response, NextFunction } from 'express';

// user id 요구
export const UserRequestValid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await check('userId')
    .exists()
    .withMessage('userId가 없습니다.')
    .bail()
    .isNumeric()
    .withMessage('형식에 맞지 않습니다.')
    .run(req);
  validationFunction(req, res, next);
};

// book id 요구
export const BookRequestValid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await check('bookId')
    .exists()
    .withMessage('bookId가 없습니다.')
    .bail()
    .isNumeric()
    .withMessage('형식에 맞지 않습니다.')
    .run(req);
  validationFunction(req, res, next);
};

// book_item id 요구
export const BookItemRequestValid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await check('bookItemId')
    .exists()
    .withMessage('bookItemId가 없습니다.')
    .bail()
    .isNumeric()
    .withMessage('형식에 맞지 않습니다.')
    .run(req);
  validationFunction(req, res, next);
};

export const OrderValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await check('bookId')
    .exists()
    .withMessage('bookId가 없습니다.')
    .bail()
    .isNumeric()
    .withMessage('형식에 맞지 않습니다.')
    .run(req);
  BookItemRequestValid(req, res, next);
};

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

// user id + book_item id 구매요구
export const OrderRequestValid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  UserRequestValid(req, res, next);
  BookItemRequestValid(req, res, next);
};

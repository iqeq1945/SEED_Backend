import { check, query } from 'express-validator';
import validationFunction from './validationFunction';
import { Request, Response, NextFunction } from 'express';

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
  await check('bookItemId')
    .exists()
    .withMessage('bookItemId가 없습니다.')
    .bail()
    .isNumeric()
    .withMessage('형식에 맞지 않습니다.')
    .run(req);
  validationFunction(req, res, next);
};

export const QueryValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await check('userId')
    .if(query('userId').exists())
    .isNumeric()
    .withMessage('number 형식 이어야 합니다.')
    .run(req);
  await check('bookId')
    .if(query('bookId').exists())
    .isNumeric()
    .withMessage('number 형식 이어야 합니다.')
    .run(req);
  validationFunction(req, res, next);
};

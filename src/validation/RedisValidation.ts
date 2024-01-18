import { check } from 'express-validator';
import validationFunction from './validationFunction';
import { Request, Response, NextFunction } from 'express';

export const LikeRequestValid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await check('bookId')
    .exists()
    .withMessage('bookId가 없습니다.')
    .bail()
    .isNumeric()
    .withMessage('number 형식이어야 합니다.')
    .run(req);
  validationFunction(req, res, next);
};

export const KeywrodRequestValid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await check('keyword')
    .exists()
    .withMessage('keword가 없습니다.')
    .bail()
    .isString()
    .withMessage('string 형식 이어야 합니다.')
    .run(req);
  validationFunction(req, res, next);
};

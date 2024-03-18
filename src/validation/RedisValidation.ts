import { check, query } from 'express-validator';
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

export const KeywordRequestValid = async (
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

export const DelKeywordRequestValid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await check('value')
    .if(query('value').exists())
    .isString()
    .withMessage('string 형식 이어야 합니다.')
    .run(req);
  validationFunction(req, res, next);
};

export const ViewRequestValid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await check('bookItemId')
    .exists()
    .withMessage('bookItemId가 없습니다.')
    .bail()
    .isNumeric()
    .withMessage('number 형식이어야 합니다.')
    .run(req);
  GetViewRequestValid(req, res, next);
};

export const GetViewRequestValid = LikeRequestValid;

import { check } from 'express-validator';
import validationFunction from './validationFunction';
import { Request, Response, NextFunction } from 'express';

//userId bookId bookItemId content
export const CreateRequestValid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await check('userId')
    .exists()
    .bail()
    .withMessage('userId가 존재하지 않습니다.')
    .isNumeric()
    .withMessage('userId는 number자료형 입니다.')
    .run(req);
  await check('bookId')
    .bail()
    .withMessage('bookId가 존재하지 않습니다.')
    .isNumeric()
    .withMessage('bookId는 number자료형 입니다.')
    .run(req);
  await check('bookItemId')
    .bail()
    .withMessage('bookItemId가 존재하지 않습니다.')
    .isNumeric()
    .withMessage('bookItemId는 number자료형 입니다.')
    .run(req);
  validationFunction(req, res, next);
};

export const DeleteRequestValid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await check('id')
    .bail()
    .withMessage('id가 존재하지 않습니다.')
    .isNumeric()
    .withMessage('id는 number자료형 입니다.')
    .run(req);
  validationFunction(req, res, next);
};

export const UpdateRequestValid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await check('content')
    .exists()
    .withMessage('content이 없습니다.')
    .bail()
    .isString()
    .withMessage('string 형식이어야 합니다.')
    .run(req);
  UpdateRequestValid(req, res, next);
};

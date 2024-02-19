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
    .withMessage('userId가 존재하지 않습니다.')
    .bail()
    .isNumeric()
    .withMessage('userId는 number자료형 입니다.')
    .run(req);
  await check('bookId')
    .exists()
    .withMessage('bookId가 존재하지 않습니다.')
    .bail()
    .isNumeric()
    .withMessage('bookId는 number자료형 입니다.')
    .run(req);
  await check('bookItemId')
    .exists()
    .withMessage('bookItemId가 존재하지 않습니다.')
    .bail()
    .isNumeric()
    .withMessage('bookItemId는 number자료형 입니다.')
    .run(req);
  await check('content')
    .exists()
    .withMessage('content이 없습니다.')
    .bail()
    .isString()
    .withMessage('string 형식이어야 합니다.')
    .run(req);
  validationFunction(req, res, next);
};

export const DeleteRequestValid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await check('id')
    .exists()
    .withMessage('id가 존재하지 않습니다.')
    .bail()
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
  DeleteRequestValid(req, res, next);
};

export const GetByUserRequestValid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await check('userId')
    .exists()
    .withMessage('userId가 없습니다.')
    .bail()
    .isNumeric()
    .withMessage('number 형식이어야 합니다.')
    .run(req);
  validationFunction(req, res, next);
};

export const GetByBookRequestValid = async (
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

export const GetByBookItemRequestValid = async (
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
  validationFunction(req, res, next);
};

import { check, body } from 'express-validator';
import validationFunction from './validationFunction';
import { Request, Response, NextFunction } from 'express';

// bookId

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
    .withMessage('number 형식이어야 합니다.')
    .run(req);
  validationFunction(req, res, next);
};

// title, content

export const CreateRequestValid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await check('title')
    .exists()
    .withMessage('title이 없습니다.')
    .bail()
    .isString()
    .withMessage('string 형식이어야 합니다.')
    .run(req);
  await check('content')
    .exists()
    .withMessage('content이 없습니다.')
    .bail()
    .isString()
    .withMessage('string 형식이어야 합니다.')
    .run(req);
  BookRequestValid(req, res, next);
};

// id

export const DeleteRequestValid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await check('id')
    .exists()
    .withMessage('id가 없습니다.')
    .bail()
    .isNumeric()
    .withMessage('number 형식이어야 합니다.')
    .run(req);
  validationFunction(req, res, next);
};

export const ReadRequestValid = DeleteRequestValid;

// ALL

export const UpdateRequestValid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await check('title')
    .if(body('title').exists())
    .isString()
    .withMessage('string 형식이어야 합니다.')
    .run(req);
  await check('content')
    .if(body('title').exists())
    .isString()
    .withMessage('string 형식이어야 합니다.')
    .run(req);
  DeleteRequestValid(req, res, next);
};

// id, open
export const OpenRequestValid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await check('open')
    .exists()
    .withMessage('open이 없습니다.')
    .bail()
    .isBoolean()
    .withMessage('boolean 형식이어야 합니다.')
    .run(req);
  DeleteRequestValid;
};

import { check } from 'express-validator';
import validationFunction from './validationFunction';
import { Request, Response, NextFunction } from 'express';

// authorId

export const AuthorRequestValid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await check('authorId')
    .exists()
    .withMessage('authorId가 없습니다.')
    .bail()
    .isNumeric()
    .withMessage('number 형식이어야 합니다.')
    .run(req);
  validationFunction(req, res, next);
};

// title, cycle, category, authorId, introduce

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
  await check('cycle')
    .exists()
    .withMessage('cycle이 없습니다.')
    .bail()
    .isString()
    .withMessage('string 형식이어야 합니다.')
    .run(req);
  await check('introduce')
    .exists()
    .withMessage('introduce이 없습니다.')
    .bail()
    .isString()
    .withMessage('string 형식이어야 합니다.')
    .run(req);
  await check('category')
    .exists()
    .withMessage('category이 없습니다.')
    .bail()
    .isString()
    .withMessage('string 형식이어야 합니다.')
    .run(req);
  AuthorRequestValid(req, res, next);
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

// ALL

export const UpdateRequestValid = async (
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
  await check('cycle')
    .exists()
    .withMessage('cycle이 없습니다.')
    .bail()
    .isString()
    .withMessage('string 형식이어야 합니다.')
    .run(req);
  await check('category')
    .exists()
    .withMessage('category이 없습니다.')
    .bail()
    .isString()
    .withMessage('string 형식이어야 합니다.')
    .run(req);
  await check('introduce')
    .exists()
    .withMessage('introduce이 없습니다.')
    .bail()
    .isString()
    .withMessage('string 형식이어야 합니다.');
  DeleteRequestValid(req, res, next);
};

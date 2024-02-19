import { check, query, body } from 'express-validator';
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
    .withMessage('book의 id가 없습니다.')
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
  await check('cycle')
    .if(body('cycle').exists())
    .isString()
    .withMessage('string 형식이어야 합니다.')
    .run(req);
  await check('category')
    .if(body('category').exists())
    .isString()
    .withMessage('string 형식이어야 합니다.')
    .run(req);
  await check('introduce')
    .if(body('introduce').exists())
    .isString()
    .withMessage('string 형식이어야 합니다.')
    .run(req);
  DeleteRequestValid(req, res, next);
};

// Get List / keyword, category, skip, take

export const ListsQueryValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await check('keyword')
    .if(query('keyword').exists())
    .isString()
    .withMessage('keyword는 string 형식입니다.')
    .run(req);
  await check('category')
    .if(query('category').exists())
    .isString()
    .withMessage('category는 string 형식입니다.')
    .run(req);
  await check('skip')
    .if(query('skip').exists())
    .isString()
    .withMessage('skip는 string 형식입니다.')
    .run(req);
  await check('take')
    .if(query('take').exists())
    .isString()
    .withMessage('take는 string 형식입니다.')
    .run(req);
  validationFunction(req, res, next);
};

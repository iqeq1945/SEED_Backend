import { check, query } from 'express-validator';
import validationFunction from './validationFunction';
import { Request, Response, NextFunction } from 'express';

export const NotificationValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await check('json')
    .exists()
    .withMessage('bookId가 없습니다.')
    .bail()
    .isJSON()
    .withMessage('Json 형식에 맞지 않습니다.')
    .run(req);
  GetNotification(req, res, next);
};

export const GetNotification = async (
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

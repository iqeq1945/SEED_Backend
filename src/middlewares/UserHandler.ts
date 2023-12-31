import { Request, Response, NextFunction } from 'express';
import resFormat from '../utils/resFormat';

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send(resFormat.fail(403, '로그인이 필요합니다.'));
  }
};

export const isNotLoggedIn = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send(resFormat.fail(403, '이미 로그인된 유저입니다.'));
  }
};

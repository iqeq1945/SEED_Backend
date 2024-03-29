import { Request, Response, NextFunction } from 'express';
import resFormat from '../utils/resFormat';

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send(resFormat.fail(403, '로그인이 필요합니다.'));
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
    res.status(403).send(resFormat.fail(403, '이미 로그인된 유저입니다.'));
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  isLoggedIn(req, res, next);
  if (req.user?.admin) {
    next();
  } else {
    res.status(401).send(resFormat.fail(401, '권한이 없습니다.'));
  }
};

export const isMine = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    res.status(403).send(resFormat.fail(403, '로그인이 필요합니다.'));
  } else {
    const userId = req.params.userId || req.query.userId;
    if (req.user!.id === parseInt(userId as string, 10)) {
      next();
    } else {
      res.status(401).send(resFormat.fail(401, '권한이 없습니다.'));
    }
  }
};

export const checkSeed = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    res.status(403).send(resFormat.fail(403, '로그인이 필요합니다.'));
  } else {
    if (req.user!.seed > 0) {
      next();
    } else {
      res.status(401).send(resFormat.fail(401, 'seed가 부족합니다..'));
    }
  }
};

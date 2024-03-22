import { Request, Response, NextFunction } from 'express';
import resFormat from '../utils/resFormat';
import * as NotifiactionRepository from '../repositories/NotifiactionRepository';

export const check = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response = await NotifiactionRepository.findById(
    parseInt(req.params.id, 10)
  );
  if (response!.userId !== req.user!.id) {
    return res.status(401).send(resFormat.fail(401, '본인의 알림이 아닙니다.'));
  }
  next();
  return;
};

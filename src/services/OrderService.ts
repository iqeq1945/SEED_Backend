import { Request, Response, NextFunction } from 'express';
import * as OrderRepository from '../repositories/OrderRepository';
import resFormat from '../utils/resFormat';

export const CreateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.body.userId != req.user!.id) {
      return res.send(resFormat.fail(400, '로그인된 유저가 아닙니다.'));
    }
    const response = await OrderRepository.create(req.body);
    if (!response) {
      return res.send(resFormat.fail(400, '실패'));
    }
    return res.send(resFormat.successData(200, '성공', response));
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const GetMyOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await OrderRepository.findByUserId(req.user!.id);
    if (!response) {
      return res.send(resFormat.fail(400, '실패'));
    }
    return res.send(resFormat.successData(200, '성공', response));
  } catch (err) {
    console.log(err);
    next(err);
  }
};

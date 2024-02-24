import { Request, Response, NextFunction } from 'express';
import * as OrderRepository from '../repositories/OrderRepository';
import resFormat from '../utils/resFormat';

export const CreateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data: OrderRepository.ORDER_CREATE = {
      userId: req.user!.id,
      bookId: req.body.bookId,
      bookItemId: req.body.bookItemId,
    };

    const response = await OrderRepository.create(data);
    if (!response) {
      return res.status(400).send(resFormat.fail(400, '실패'));
    }

    return res
      .status(200)
      .send(resFormat.successData(200, '구매성공', response));
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const GetOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data: OrderRepository.ORDER = {
      userId: req.query.userId
        ? parseInt(req.query.userId as string, 10)
        : undefined,
      bookId: req.query.bookId
        ? parseInt(req.query.bookId as string, 10)
        : undefined,
    };
    const response = await OrderRepository.findByQuery(data);
    if (!response) {
      return res.status(400).send(resFormat.fail(400, '실패'));
    }
    return res.status(200).send(resFormat.successData(200, '성공', response));
  } catch (err) {
    console.log(err);
    next(err);
  }
};

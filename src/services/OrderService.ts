import { Request, Response, NextFunction } from 'express';
import * as OrderRepository from '../repositories/OrderRepository';
import resFormat from '../utils/resFormat';

export const CreateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data: OrderRepository.ORDER = {
      userId: req.user!.id,
      bookId: req.body.bookId,
      bookItemId: req.body.bookItemId,
    };
    const response = await OrderRepository.create(data);
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
      return res.status(400).send(resFormat.fail(400, '실패'));
    }
    return res.status(200).send(resFormat.successData(200, '성공', response));
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const GetOrderByBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await OrderRepository.findByBookId(req.body.bookId);
    if (!response) {
      return res.status(400).send(resFormat.fail(400, '실패'));
    }
    return res.status(200).send(resFormat.successData(200, '성공', response));
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const GetOrderByBookItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await OrderRepository.findByBookId(req.body.bookItemId);
    if (!response) {
      return res.status(400).send(resFormat.fail(400, '실패'));
    }
    return res.status(200).send(resFormat.successData(200, '성공', response));
  } catch (err) {
    console.log(err);
    next(err);
  }
};

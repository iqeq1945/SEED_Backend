import { Request, Response, NextFunction } from 'express';
import resFormat from '../utils/resFormat';
import * as Notification from '../repositories/NotifiactionRepository';

export const CreateNotification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await Notification.create(req.body);
    if (!response) {
      return res.status(400).send(resFormat.fail(400, '실패'));
    }
    return res
      .status(200)
      .send(resFormat.successData(200, 'Notification 생성 성공', response));
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const GetNotification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await Notification.findByUserId(
      parseInt(req.query.userId as string, 10)
    );
    if (!response) {
      return res.status(400).send(resFormat.fail(400, '실패'));
    }
    return res
      .status(200)
      .send(resFormat.successData(200, 'Notification 생성 성공', response));
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const DeleteNotification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await Notification.deleteOne(parseInt(req.params.id, 10));
    if (!response) {
      return res.status(400).send(resFormat.fail(400, '실패'));
    }
    return res
      .status(200)
      .send(resFormat.successData(200, 'Notification 삭제 성공', response));
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const DeleteAllNotification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await Notification.deleteAll(req.user!.id);
    if (!response) {
      return res.status(400).send(resFormat.fail(400, '실패'));
    }
    return res
      .status(200)
      .send(resFormat.successData(200, 'Notification 삭제 성공', response));
  } catch (err) {
    console.error(err);
    next(err);
  }
};

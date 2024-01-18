import { Request, Response, NextFunction } from 'express';
import * as RedisRepository from '../repositories/RedisRepository';
import resFormat from '../utils/resFormat';

export const SetLike = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await RedisRepository.setLike(
      req.body.bookId,
      req.user!.id
    );
    if (!response) {
      return res.status(400).send(resFormat.fail(400, '실패'));
    }
    return res.status(200).send(resFormat.success(200, '좋아요 성공'));
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const GetLike = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await RedisRepository.getLike(
      parseInt(req.params.bookId, 10)
    );
    if (!response) {
      return res
        .status(400)
        .send(resFormat.failData(400, 'DB 접근 실패', response));
    }
    return res
      .status(200)
      .send(resFormat.successData(200, '좋아요 정보 가져오기 성공', response));
  } catch (err) {
    console.log(err);
    next(err);
  }
};

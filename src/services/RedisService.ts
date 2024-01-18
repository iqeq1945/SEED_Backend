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

export const SetKeyword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await RedisRepository.setKeyword(
      req.body.keyword,
      req.user!.id
    );
    if (isNaN(response)) {
      return res.status(400).send(resFormat.fail(400, '실패'));
    }
    return res
      .status(200)
      .send(resFormat.success(200, '최근검색목록 등록 성공'));
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const GetKeyword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await RedisRepository.getKeyword(req.user!.id);
    if (!response) {
      return res
        .status(400)
        .send(resFormat.fail(400, '최근 검색목록 가져오기 실패'));
    }
    return res
      .status(200)
      .send(resFormat.successData(200, '최근검색목록 갖고오기 성공', response));
  } catch (err) {
    console.log(err);
    next(err);
  }
};

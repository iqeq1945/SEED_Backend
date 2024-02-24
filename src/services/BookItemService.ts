import { Request, Response, NextFunction } from 'express';
import resFormat from '../utils/resFormat';
import * as BookItemRepository from '../repositories/BookItemRepository';
import * as RedisRepositoy from '../repositories/RedisRepository';

export const CreateItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await BookItemRepository.create(req.body);
    if (!response) {
      return res.status(400).send(resFormat.fail(400, '실패'));
    }
    return res
      .status(200)
      .send(resFormat.successData(200, 'Item 생성 성공', response));
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const UpdateItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, ...data } = req.body;
    console.log(id, data);
    const response = await BookItemRepository.update(id, data);
    if (!response) {
      return res.status(400).send(resFormat.fail(400, '실패'));
    }
    return res
      .status(200)
      .send(resFormat.successData(200, 'Item 수정 성공', response));
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const DeleteItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await BookItemRepository.erase(req.body.id);
    if (!response) {
      return res.status(400).send(resFormat.fail(400, '실패'));
    }
    return res
      .status(200)
      .send(resFormat.successData(200, 'Book Item 삭제 성공', response));
  } catch (err) {
    console.log(err);
    next(err);
  }
};
export const GetItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const check = await RedisRepositoy.checkBookItem(
      parseInt(req.params.id, 10)
    );
    if (check) {
      const response = await RedisRepositoy.getBookItem(
        parseInt(req.params.id, 10)
      );
      return res
        .status(200)
        .send(
          resFormat.successData(200, 'Book Item 정보 가져오기 성공', response)
        );
    }
    const response = await BookItemRepository.findById(
      parseInt(req.params.id, 10)
    );

    if (!response) {
      return res.status(400).send(resFormat.fail(400, '실패'));
    }

    const redisCheck = await RedisRepositoy.setBookItem(
      parseInt(req.params.id, 10),
      JSON.stringify(response)
    );
    if (!redisCheck) {
      console.log('redis 오류');
    }

    return res
      .status(200)
      .send(
        resFormat.successData(200, 'Book Item 정보 가져오기 성공', response)
      );
  } catch (err) {
    console.log(err);
    next(err);
  }
};
export const OpenItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await BookItemRepository.open(req.body.id, req.body.open);
    if (!response) {
      return res.status(400).send(resFormat.fail(400, '실패'));
    }
    return res
      .status(200)
      .send(
        resFormat.successData(200, 'Book Item Open 상태 수정 성공', response)
      );
  } catch (err) {
    console.log(err);
    next(err);
  }
};

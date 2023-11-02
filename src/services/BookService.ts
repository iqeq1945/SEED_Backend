import { Request, Response, NextFunction } from 'express';
import resFormat from '../utils/resFormat';
import * as BookRespository from '../repositories/BookRepostiory';

export const CreateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.body.authorId != req.user.id) {
      return res.send(resFormat.fail(401, '로그인된 유저와 같지 않습니다.'));
    }
    const response = await BookRespository.create(req.body);
    if (!response) {
      return res.send(resFormat.fail(400, '실패'));
    }
    return res.send(resFormat.successData(200, 'Book 생성 성공', response));
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const UpdateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, ...data } = req.body;
    console.log(id, data);
    const checkAuthor = await BookRespository.findById(req.body.id);
    if (checkAuthor!.author.id != req.user.id) {
      return res.send(resFormat.fail(401, '권한을 갖고 있지 않음'));
    }
    const response = await BookRespository.update(id, data);
    if (!response) {
      return res.send(resFormat.fail(400, '실패'));
    }
    return res.send(resFormat.successData(200, 'Book 수정 성공', response));
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const DeleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const checkAuthor = await BookRespository.findById(req.body.id);
    if (checkAuthor!.author.id != req.user.id) {
      return res.send(resFormat.fail(401, '권한을 갖고 있지 않음'));
    }
    const response = await BookRespository.erase(req.body.id);
    if (!response) {
      return res.send(resFormat.fail(400, '실패'));
    }
    return res.send(resFormat.successData(200, 'Book 삭제 성공', response));
  } catch (err) {
    console.log(err);
    next(err);
  }
};

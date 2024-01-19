import { Request, Response, NextFunction } from 'express';
import resFormat from '../utils/resFormat';
import * as BookRepository from '../repositories/BookRepostiory';

export const checkAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id =
      req.body.bookId || req.body.id || parseInt(req.params.bookId, 10);
    const response = await BookRepository.findById(id);
    if (!response) {
      return res
        .status(403)
        .send(resFormat.fail(403, '존재하지 않는 정보입니다.'));
    }
    if (response!.author.id != req.user!.id) {
      return res.status(401).send(resFormat.fail(401, '권한을 갖고 있지 않음'));
    }
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const existBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookId = req.body.bookId || parseInt(req.params.bookId, 10);
    const response = await BookRepository.findById(bookId);
    if (!response) {
      return res
        .status(400)
        .send(resFormat.fail(400, '존재하지 않는 book id입니다.'));
    }
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

import { Request, Response, NextFunction } from 'express';
import resFormat from '../utils/resFormat';
import * as BookRepository from '../repositories/BookRepostiory';

export const checkAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.body.bookId || req.body.id;
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

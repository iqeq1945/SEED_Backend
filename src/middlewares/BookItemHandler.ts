import { Request, Response, NextFunction } from 'express';
import resFormat from '../utils/resFormat';
import * as BookItemRepository from '../repositories/BookItemRepository';

export const checkAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.body.bookItemId || req.body.id;
    const response = await BookItemRepository.findById(id);
    if (!response) {
      return res
        .status(403)
        .send(resFormat.fail(403, '존재하지 않는 정보입니다.'));
    }
    if (response!.book.authorId != req.user!.id) {
      return res.status(401).send(resFormat.fail(401, '권한을 갖고 있지 않음'));
    }
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

import { Request, Response, NextFunction } from 'express';
import resFormat from '../utils/resFormat';
import * as BookItemRepository from '../repositories/BookItemRepository';

export const checkAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.user!.admin) return next();
    const id =
      req.body.bookItemId || req.body.id || parseInt(req.params.id, 10);
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

export const checkBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response = await BookItemRepository.findById(
    req.body.bookItemId || parseInt(req.params.id, 10)
  );
  if (!response) {
    return res
      .status(400)
      .send(resFormat.fail(400, '존재하지 않는 book_item id입니다.'));
  } else {
    if (response.bookId != req.body.bookId) {
      return res
        .status(400)
        .send(resFormat.fail(400, 'book 과 book_item의 관계가 맞지않습니다.'));
    }
    return next();
  }
};

export const existBookItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookItemId =
      req.body.bookItemId || req.body.id || parseInt(req.params.id, 10);
    const response = await BookItemRepository.findById(bookItemId);
    if (!response) {
      return res
        .status(400)
        .send(resFormat.fail(400, '존재하지 않는 book_item id입니다.'));
    }
    next();
    return;
  } catch (err) {
    console.log(err);
    next(err);
  }
};

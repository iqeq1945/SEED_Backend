import { Request, Response, NextFunction } from 'express';
import resFormat from '../utils/resFormat';
import * as BookRepository from '../repositories/BookRepostiory';

export const CreateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.body.authorId != req.user.id) {
      return res.send(resFormat.fail(401, '로그인된 유저와 같지 않습니다.'));
    }
    const response = await BookRepository.create(req.body);
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
    const response = await BookRepository.update(id, data);
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
    const response = await BookRepository.erase(req.body.id);
    if (!response) {
      return res.send(resFormat.fail(400, '실패'));
    }
    return res.send(resFormat.successData(200, 'Book 삭제 성공', response));
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const ReadBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await BookRepository.findById(req.body.id);
    if (!response) {
      return res.send(resFormat.fail(400, '정보 가져오기 실패'));
    }
    return res.send(
      resFormat.successData(200, 'Book 정보 가져오기 성공', response)
    );
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const GetListBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const keyword = req.params.keyword as string;
    const category = req.params.category as string;
    if (keyword) {
      const response = await BookRepository.getByKeyword(keyword);
      if (!response) return res.send(resFormat.fail(400, '실패'));
      return res.send(resFormat.successData(200, '검색 성공', response));
    }
    if (category) {
      const response = await BookRepository.getByCategory(category);
      if (!response) return res.send(resFormat.fail(400, '실패'));
      return res.send(resFormat.successData(200, '검색 성공', response));
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

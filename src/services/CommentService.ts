import { Request, Response, NextFunction } from 'express';
import * as CommentRepository from '../repositories/CommentRepository';
import resFormat from '../utils/resFormat';

export const CreateComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.body.userId != req.user!.id) {
      return res
        .status(401)
        .send(resFormat.fail(401, '로그인된 유저와 같지 않습니다.'));
    }
    const response = await CommentRepository.create(req.body);
    if (!response) {
      return res.status(400).send(resFormat.fail(400, '실패'));
    }
    return res
      .status(200)
      .send(resFormat.successData(200, 'Comment 생성 성공', response));
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const UpdateComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let data = req.body;
    data.userId = req.user?.id;
    const response = await CommentRepository.update(data);
    if (!response) {
      return res.status(400).send(resFormat.fail(400, '실패'));
    }
    return res
      .status(200)
      .send(resFormat.successData(200, 'Comment 수정 성공', response));
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const DeleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await CommentRepository.clear(
      req.body.id || parseInt(req.params.id, 10)
    );
    if (!response) {
      return res.status(400).send(resFormat.fail(400, '실패'));
    }
    return res.status(200).send(resFormat.success(200, 'Comment 삭제 성공'));
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const GetCommentByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await CommentRepository.findByUser(
      parseInt(req.params.userId, 10)
    );
    if (!response) {
      return res.status(400).send(resFormat.fail(400, '실패'));
    }
    return res
      .status(200)
      .send(resFormat.successData(200, 'Comment 정보 가져오기', response));
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const GetCommentByBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await CommentRepository.findByBook(
      parseInt(req.params.bookId, 10)
    );
    if (!response) {
      return res.status(400).send(resFormat.fail(400, '실패'));
    }
    return res
      .status(200)
      .send(resFormat.successData(200, 'Comment 정보 가져오기', response));
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const GetCommentByBookItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await CommentRepository.findByBookItem(
      parseInt(req.params.bookItemId, 10)
    );
    if (!response) {
      return res.status(400).send(resFormat.fail(400, '실패'));
    }
    return res
      .status(200)
      .send(resFormat.successData(200, 'Comment 정보 가져오기', response));
  } catch (err) {
    console.log(err);
    next(err);
  }
};

import { Request, Response, NextFunction } from 'express';
import * as RedisRepository from '../repositories/RedisRepository';
import resFormat from '../utils/resFormat';
import * as UserRepository from '../repositories/UserRepository';
import * as Mail from '../utils/mail';

export const SetLike = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const check = await RedisRepository.getLike(req.body.bookId);
    console.log(check);
    if (check.indexOf(String(req.body.bookId)) && check.length > 0) {
      return res
        .status(400)
        .send(resFormat.fail(400, '이미 좋아요 상태입니다.'));
    }

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

export const DelLike = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await RedisRepository.delLike(
      parseInt(req.params.bookId, 10),
      req.user!.id
    );
    if (!response) {
      return res.status(400).send(resFormat.fail(400, '실패'));
    }
    return res.status(200).send(resFormat.success(200, '좋아요 취소 성송'));
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
    const len = await RedisRepository.countKeyword(req.user!.id);
    console.log(len);
    if (len > 9) {
      const pop = await RedisRepository.delKeyword(req.user!.id, undefined);
    }
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

export const CountKeyword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await RedisRepository.countKeyword(req.user!.id);
    return res
      .status(200)
      .send(
        resFormat.successData(200, '최근검색목록 개수 가져오기 성공', response)
      );
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const DelKeyword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await RedisRepository.delKeyword(
      req.user!.id,
      req.query.value
    );
    if (!response) {
      return res.status(400).send(resFormat.fail(400, '실패'));
    }
    return res.status(200).send(resFormat.success(200, '검색목록 삭제'));
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const SetView = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await RedisRepository.setView(
      req.body.bookId,
      req.body.bookItemId,
      req.user!.id
    );
    if (!response) {
      return res.status(400).send(resFormat.fail(400, '실패'));
    }
    return res.status(200).send(resFormat.success(200, '조회수 등록 성공'));
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const GetView = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await RedisRepository.getView(
      parseInt(req.params.bookId, 10)
    );
    if (!response) {
      return res.status(400).send(resFormat.fail(400, '실패'));
    }
    return res
      .status(200)
      .send(resFormat.successData(200, '조회수 정보 가져오기 성공', response));
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const setSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const check = await UserRepository.findByEmail(req.body.email);
    if (check) {
      return res
        .status(400)
        .send(resFormat.fail(400, '이미존재하는 계정입니다.'));
    }
    const response = await RedisRepository.setSignup(req.body.email);
    if (!response) {
      return res.status(400).send(resFormat.fail(400, '실패'));
    }

    const data = {
      to: req.body.email,
      subject: '인증번호 발송입니다.',
      html: `<h2>${response}</h2>`,
    };
    const result = await Mail.sendMail(data);
    return res
      .status(200)
      .send(resFormat.successData(200, '인증번호 가져오기 성공', response));
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const getSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await RedisRepository.getSignup(req.params.email);
    if (!response) {
      return res.status(400).send(resFormat.fail(400, '실패'));
    }
    return res
      .status(200)
      .send(resFormat.successData(200, '확인 성공', response));
  } catch (err) {
    console.log(err);
    next(err);
  }
};

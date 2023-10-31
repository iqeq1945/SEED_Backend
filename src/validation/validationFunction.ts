import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import resFormat from '../utils/resFormat';

export default (req: Request, res: Response, next: NextFunction) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res
      .status(400)
      .send(resFormat.failData(400, 'Request Data validation fail', error));
  } else {
    next();
  }
};

import * as RedisRepository from '../repositories/RedisRepository';
import express, { Request, Response } from 'express';

const Router = express.Router();

Router.get('/', async (req: Request, res: Response) => {
  const response = await RedisRepository.setLike(12, 5);
  res.json(response);
});

export default Router;

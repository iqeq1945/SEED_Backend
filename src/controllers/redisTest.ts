import * as RedisRepository from '../repositories/RedisRepository';
import express, { Request, Response } from 'express';

const Router = express.Router();

Router.get('/', async (req: Request, res: Response) => {
  const response = await RedisRepository.setTest();
  console.log(response, 'hihi');
  res.send(response);
});

export default Router;

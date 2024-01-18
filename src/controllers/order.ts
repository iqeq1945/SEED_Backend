import express, { Request, Response } from 'express';
import * as UserHandler from '../middlewares/UserHandler';
import * as BookItemHandler from '../middlewares/BookItemHandler';
import * as OrderValidation from '../validation/OrderValidation';
import * as OrderService from '../services/OrderService';

const Router = express.Router();

Router.get('/', UserHandler.isLoggedIn, OrderService.GetMyOrder);

Router.post(
  '/',
  UserHandler.isLoggedIn,
  OrderValidation.OrderValidation,
  BookItemHandler.checkBook,
  OrderService.CreateOrder
);

export default Router;

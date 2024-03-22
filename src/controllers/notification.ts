import express from 'express';
import * as NotificationValidation from '../validation/NotificationValidation';
import * as UserHandler from '../middlewares/UserHandler';
import * as NotificationService from '../services/NotificationService';

const Router = express.Router();

// Notification 정보 가져오기
Router.get(
  '/',
  UserHandler.isMine,
  NotificationValidation.GetNotification,
  NotificationService.GetNotification
);

// Notifiaction 생성
Router.post(
  '/',
  UserHandler.isLoggedIn,
  NotificationValidation.NotificationValidation,
  NotificationService.CreateNotification
);

// Notification 하나 삭제
Router.delete(
  '/:id',
  UserHandler.isLoggedIn,
  NotificationService.DeleteNotification
);

// Notification 모두 삭제
Router.delete(
  '/all/:userId',
  UserHandler.isMine,
  NotificationValidation.GetNotification,
  NotificationService.DeleteAllNotification
);
export default Router;

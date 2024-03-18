import * as Mail from '../config/nodemailer';
import * as RedisRpository from '../repositories/RedisRepository';

export const sendMail = async (data: any) => {
  const response = Mail.sendMail(data);
};

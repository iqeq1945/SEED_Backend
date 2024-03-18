import * as nodeMailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const sendMail = async (data: any) => {
  const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_PASS },
  });

  const mailOptions = {
    to: 'EMAIL',
    subject: '가입 인증 메일',
    html: `${data}`,
  };

  //await transporter.sendMail(mailOptions);
};

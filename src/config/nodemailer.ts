import * as nodeMailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const transporter = nodeMailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_PASS },
});

//  await transporter.sendMail(mailOptions);

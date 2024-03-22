import * as Mail from '../config/nodemailer';

interface Mail {
  to: string;
  subject: string;
  html: string;
}

export const sendMail = async (data: Mail) => {
  const transport = Mail.transporter;
  const mailOptions = {
    to: data.to,
    subject: data.subject,
    html: `${data.html}`,
  };
  return await transport.sendMail(mailOptions);
};

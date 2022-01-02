import nodemailer from 'nodemailer';

import 'dotenv';

const transport = nodemailer.createTransport({
  // @ts-ignore
  // host: 'smtp.mailtrap.io',
  service: 'gmail',
  // port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

export default transport;

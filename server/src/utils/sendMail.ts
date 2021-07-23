import sgMail from '@sendgrid/mail';
import { InternalServerError } from './appError';
import dotenv from 'dotenv';

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API as string);

type Message = {
  to: string;
  from: { name: string; email: string };
  subject: string;
  html: string;
};
const sendMessage = async (message: Message) => {
  try {
    return await sgMail.send(message);
  } catch (error) {
    console.log(error.response.body);
    throw new InternalServerError('Internal server error');
  }
};

export default sendMessage;

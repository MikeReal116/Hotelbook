import jwt from 'jsonwebtoken';

import { BadRequestError } from '../utils/appError';
import User, { UserDocument } from '../models/User';
import sendMessage from '../utils/sendMail';
import { compareSync } from 'bcryptjs';

const signup = async (user: UserDocument) => {
  const existingUser = await User.findOne({ email: user.email });
  if (existingUser) throw new BadRequestError('user already exist');

  return await User.create(user);
};

const login = async (email: string, password: string) => {
  const existingUser = await User.findOne({ email });
  if (!existingUser) throw new BadRequestError('Unable to login');

  const isCorrect = await existingUser.checkPassword(password);

  if (!isCorrect) throw new BadRequestError('Unable to login');

  return existingUser;
};

const forgotPassword = async (email: string) => {
  const existingUser = await User.findOne({ email });
  if (!existingUser) throw new BadRequestError('Unable to reset password');

  const token = jwt.sign(
    { email: existingUser.email },
    process.env.JWT_STRING as string,
    { expiresIn: '15m' }
  );
  existingUser.resetPasswordToken = token;

  const message = {
    to: existingUser.email,
    from: { name: 'Booking', email: process.env.SENDGRID_EMAIL as string },
    subject: 'Reset password link',
    html: `<p>Here is your password reset token</p><p>It expires in 15 mins</p> <br/> <a href=${process.env.CLIENT_URL}/auth/resetpassword/${existingUser._id}/${token}>Reset password</a>`
  };

  await sendMessage(message);
  return await existingUser.save();
};

const resetPassword = async (
  password: string,
  resetPassword: string,
  id: string,
  token: string
) => {
  const user = await User.findOne({ _id: id, resetPasswordToken: token });
  if (!user) throw new BadRequestError('Unable to reset password');

  if (password !== resetPassword)
    throw new BadRequestError('Unable to reset password');

  const decoded = jwt.verify(token, process.env.JWT_STRING as string);
  if (!decoded) {
    user.resetPassword = undefined;
    await user.save();
    throw new BadRequestError(' Unable to reset password');
  }
  user.password = password;
  user.resetPasswordToken = undefined;
  return await user.save();
};

export default { signup, login, forgotPassword, resetPassword };

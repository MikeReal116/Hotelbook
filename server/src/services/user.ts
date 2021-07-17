import { BadRequestError } from '../utils/appError';
import User, { UserDocument } from '../models/User';

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

export default { signup, login };

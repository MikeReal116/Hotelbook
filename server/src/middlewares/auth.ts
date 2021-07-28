import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../utils/appError';
import User from '../models/User';

const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  try {
    if (!token) {
      throw new UnauthorizedError('Please login');
    }
    const decoded: any = jwt.verify(token, process.env.JWT_STRING as string);
    const user = await User.findOne({ email: decoded.email });
    if (!user) throw new UnauthorizedError('Please login');
    req.user = user;
    next();
  } catch (error) {
    next(new UnauthorizedError('Please login'));
  }
};

export default checkAuth;

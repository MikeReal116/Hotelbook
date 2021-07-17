import { Request, Response, NextFunction } from 'express';

import { BadRequestError } from 'utils/appError';
import UserServices from '../services/user';

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.body;
  try {
    const newUser = await UserServices.signup(user);
    const token = newUser.getToken();

    res.json(201).json({
      user: {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        role: newUser.role
      },
      token
    });
  } catch (error) {
    return next(new BadRequestError('Bad request'));
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    const user = await UserServices.login(email, password);
    const token = user.getToken();

    res.json(201).json({
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      },
      token
    });
  } catch (error) {
    return next(new BadRequestError('Bad request'));
  }
};

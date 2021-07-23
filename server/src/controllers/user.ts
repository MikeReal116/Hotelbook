import { Request, Response, NextFunction } from 'express';

import { BadRequestError, InternalServerError } from '../utils/appError';
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

    res.status(201).json({
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

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const user = await UserServices.login(email, password);
    const token = user.getToken();

    res.status(201).json({
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      },
      token
    });
  } catch (error) {
    return next(new BadRequestError('Unable to login 💥'));
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  try {
    await UserServices.forgotPassword(email);
    res.json({
      message: 'Check email to change password'
    });
  } catch (error) {
    next(new InternalServerError('Internal server error'));
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password, resetPassword } = req.body;
  const { id, token } = req.params;
  try {
    await UserServices.resetPassword(password, resetPassword, id, token);
    res.json({
      message: 'Password was successfully reset, Login with new password'
    });
  } catch (error) {
    next(new BadRequestError('Unable to change password'));
  }
};

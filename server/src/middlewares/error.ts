import { Request, Response, NextFunction } from 'express';

import { AppError } from '../utils/appError';

export default (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(error.statusCode).json({
    status: 'error',
    error,
    message: error.message,
    stack: error.stack
  });
};

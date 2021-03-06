import { Request, Response, NextFunction } from 'express';

import { InternalServerError, BadRequestError } from '../utils/appError';
import ReviewServices from '../services/review';
import Review from '../models/Review';

export const getAllReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reviews = await ReviewServices.getAllReviews();
    res.json(reviews);
  } catch (error) {
    next(new InternalServerError('Internal Server Error'));
  }
};

export const postReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { roomId } = req.params;
  const userId = req.user._id;
  const reviewerName = req.user.firstName;

  const review = new Review({
    ...req.body,
    room: roomId,
    reviewer: userId,
    reviewerName
  });
  try {
    const newReview = await ReviewServices.postReview(review);
    res.json(newReview);
  } catch (error) {
    if (error.name === 'ValidationError')
      return next(new BadRequestError('Bad request'));
    next(new InternalServerError('You can not make a review for this room'));
  }
};

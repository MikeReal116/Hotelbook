import Review, { ReviewDocument } from '../models/Review';
import Booking from '../models/Booking';
import Room from '../models/Room';
import { BadRequestError } from '../utils/appError';

const getAllReviews = async () => {
  return await Review.find({});
};

const postReview = async (review: ReviewDocument) => {
  const hasBooked = await Booking.findOne({
    roomId: review.room,
    userId: review.reviewer
  });
  if (!hasBooked) {
    throw new BadRequestError(
      'You have not booked room before to give a review'
    );
  }
  const existingReview = await Review.findOne({
    room: review.room,
    reviewer: review.reviewer
  });

  if (existingReview) {
    existingReview.rating = review.rating;
    existingReview.review = review.review;
    await existingReview.save();
    return await Room.findById(existingReview.room).populate({
      path: 'review',
      select: '-__v -updatedAt'
    });
  }
  return await Room.findById(review.room).populate({
    path: 'review',
    select: '-__v -updatedAt'
  });
};

export default { getAllReviews, postReview };

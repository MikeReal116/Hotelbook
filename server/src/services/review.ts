import Review, { ReviewDocument } from '../models/Review';
import Booking from '../models/Booking';
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
    return await existingReview.save();
  }
  return await review.save();
};

export default { getAllReviews, postReview };

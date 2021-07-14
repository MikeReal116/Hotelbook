import Review, { ReviewDocument } from '../models/Review';

const getAllReviews = async () => {
  return await Review.find({});
};

const postReview = async (review: ReviewDocument) => {
  return await review.save();
};

export default { getAllReviews, postReview };

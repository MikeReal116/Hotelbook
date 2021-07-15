import mongoose, { Document } from 'mongoose';

export type ReviewDocument = Document & {
  reviewerName: string;
  reviewer: string;
  room: string;
  rating: number;
  review: string;
};
const reviewSchema = new mongoose.Schema(
  {
    reviewerName: {
      type: String,
      required: true,
      trim: true
    },
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      required: true
    },
    rating: {
      type: Number,
      required: true
    },
    review: {
      type: String,
      trim: true,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Review = mongoose.model('Review', reviewSchema);

export default Review;

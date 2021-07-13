import mongoose, { Document } from 'mongoose';

export type RoomDocument = Document & {
  name: string;
  address: string;
  price: number;
  description: string;
  rating?: number;
  numberOfRating?: number;
  WiFi?: boolean;
  breakfast?: boolean;
  numberOfBeds?: number;
  images?: string;
  guestCapacity?: number;
  user?: string;
};

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'A name must be provided']
    },
    address: {
      type: String,
      trim: true,
      required: [true, 'An address must be provided']
    },
    price: {
      type: Number,
      required: [true, 'A price must be provided']
    },
    description: {
      type: String,
      required: [true, 'A description must be provided']
    },
    rating: {
      type: Number,
      default: 5
    },
    numberOfRating: {
      type: Number,
      default: 0
    },
    WiFi: {
      type: Boolean,
      default: true
    },
    breakfast: {
      type: Boolean,
      default: false
    },
    numberOfBeds: {
      type: Number
    },
    images: [String],
    guestCapacity: {
      type: Number
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

const Room = mongoose.model('Room', roomSchema);
export default Room;

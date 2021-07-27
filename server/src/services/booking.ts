import Booking, { BookingDocument } from '../models/Booking';

const createBooking = async (booking: BookingDocument) => {
  return await booking.save();
};

const getBooking = async (userId: string) => {
  return await Booking.find({ userId }).populate({
    path: 'roomId',
    select: 'images name'
  });
};
export default { createBooking, getBooking };

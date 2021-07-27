import * as Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

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

const getFree = async (id: string, startDate: string, endDate: string) => {
  const booking = await Booking.find({
    $and: [
      { roomId: id },
      { startDate: { $lte: new Date(endDate).toISOString() } },
      { endDate: { $gte: new Date(startDate).toISOString() } }
    ]
  });
  let isAvailable: boolean;
  if (booking && booking.length === 0) {
    isAvailable = true;
  } else {
    isAvailable = false;
  }

  return isAvailable;
};

const getBooked = async (id: string) => {
  const bookings = await Booking.find({
    roomId: id,
    endDate: { $gte: new Date().toISOString() }
  });

  let bookedDays: string[] = [];

  if (bookings.length) {
    bookings.forEach((booking) => {
      const range = moment.range(booking.startDate, booking.endDate);
      const days = Array.from(range.by('day'));
      const booked = days.map((day) => day.format());
      bookedDays = bookedDays.concat(booked);
    });
  }
  return bookedDays;
};
export default { createBooking, getBooking, getFree, getBooked };

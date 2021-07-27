import { Request, Response, NextFunction } from 'express';
import { InternalServerError } from '../utils/appError';

import Booking from '../models/Booking';
import BookingServices from '../services/booking';

export const createBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { roomId } = req.params;
  const { startDate, endDate, numberOfDays, amount } = req.body;
  const userId = req.user._id;
  const booking = new Booking({
    userId,
    roomId,
    startDate,
    endDate,
    numberOfDays,
    amount
  });
  try {
    const newBooking = await BookingServices.createBooking(booking);
    res.status(201).json(newBooking);
  } catch (error) {
    next(new InternalServerError('Internal server error'));
  }
};

export const getBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user._id;
  try {
    const bookings = await BookingServices.getBooking(userId);
    res.json(bookings);
  } catch (error) {
    next(new InternalServerError('Internal server error'));
  }
};

export const getFree = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { startDate, endDate } = req.body;
  try {
    const available = await BookingServices.getFree(id, startDate, endDate);
    res.json({
      available: available
    });
  } catch (error) {
    next(new InternalServerError('Internal server error'));
  }
};

export const getBooked = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const bookings = await BookingServices.getBooked(id);

    res.json(bookings);
  } catch (error) {
    next(new InternalServerError('Internal server error'));
  }
};

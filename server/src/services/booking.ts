import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
import Stripe from 'stripe';

import Room from '../models/Room';
import User from '../models/User';
import Booking, { BookingDocument } from '../models/Booking';
import { BadRequestError } from '../utils/appError';

type StripeEventData = Stripe.Event.Data.Object & {
  amount_total: number;
  client_reference_id: string;
  customer_email: string;
  metadata: {
    startDate: string;
    endDate: string;
    numberOfDays: number;
  };
};

const stripe = new Stripe(process.env.STRIPE_SECRET as string, {
  apiVersion: '2020-08-27'
});
const moment = extendMoment(Moment);

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

const stripeCheckout = async (
  roomId: string,
  userId: string,
  startDate: string,
  endDate: string,
  numberOfDays: number,
  amount: number,
  email: string
) => {
  {
  }
  const room = await Room.findById(roomId);
  const session = await stripe.checkout.sessions.create({
    success_url: `${process.env.CLIENT_URL}/me`,
    cancel_url: `${process.env.CLIENT_URL}/rooms/${roomId}`,
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [
      {
        amount: amount * 100,
        quantity: 1,
        currency: 'eur',
        name: room.name,
        images: [room.images[0]]
      }
    ],
    client_reference_id: roomId,
    customer_email: email,
    metadata: { startDate, endDate, numberOfDays }
  });
  return session;
};

const listenCheckout = async (signature: string | string[], body) => {
  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
    if (event.type === 'checkout.session.completed') {
      const sessionData = event.data.object as StripeEventData;
      const amount = sessionData.amount_total / 100;
      const userId = (await User.findOne({ email: sessionData.customer_email }))
        .id;
      const roomId = sessionData.client_reference_id;
      const { startDate, endDate, numberOfDays } = sessionData.metadata;
      return await Booking.create({
        roomId,
        userId,
        startDate,
        endDate,
        numberOfDays,
        amount
      });
    }
  } catch (error) {
    throw new BadRequestError(error.message);
  }
};

export default {
  createBooking,
  getBooking,
  getFree,
  getBooked,
  stripeCheckout,
  listenCheckout
};

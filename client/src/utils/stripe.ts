import { loadStripe } from '@stripe/stripe-js';
import axios from '../axios/axios';

const makePayment = async (
  roomId: string,
  startDate: string,
  endDate: string,
  numberOfDays: number,
  amount: number
) => {
  try {
    const { data } = await axios.post(`/api/v1/bookings/${roomId}/checkout`, {
      startDate,
      endDate,
      numberOfDays,
      amount
    });
    const stripe = await loadStripe(process.env.REACT_APP_STRIPE as string);
    stripe?.redirectToCheckout({ sessionId: data.id });
  } catch (error) {
    console.log(error);
  }
};

export default makePayment;

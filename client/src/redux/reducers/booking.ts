import {
  BOOK_ROOM,
  BOOK_ROOM_ERROR,
  FINISH_LOADING_BOOK,
  GET_ALL_BOOKING,
  GET_AVAILABLE,
  GET_BOOKED,
  START_LOADING_BOOK
} from '../actions/constant';
import { BookingActionType } from '../types/actionType';
import { BookingReturn } from '../types/bookingType';

type InitialType = {
  error: string;
  booking: BookingReturn[];
  loading: boolean;
  isAvailable?: boolean;
  booked?: string[];
};

const initialState: InitialType = {
  error: '',
  booking: [],
  loading: false
};

const bookingReducer = (
  state = initialState,
  action: BookingActionType
): InitialType => {
  switch (action.type) {
    case BOOK_ROOM:
      return { ...state };
    case BOOK_ROOM_ERROR:
      return { ...state, error: action.payload };
    case START_LOADING_BOOK:
      return { ...state, loading: true, error: '' };
    case FINISH_LOADING_BOOK:
      return { ...state, loading: false };
    case GET_ALL_BOOKING:
      return { ...state, booking: action.payload };
    case GET_AVAILABLE:
      return { ...state, isAvailable: action.payload };
    case GET_BOOKED:
      return { ...state, booked: action.payload };
    default:
      return state;
  }
};

export default bookingReducer;

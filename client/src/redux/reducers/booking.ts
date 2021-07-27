import { BOOK_ROOM, BOOK_ROOM_ERROR } from '../actions/constant';
import { BookingActionType } from '../types/actionType';
import { BookingType } from '../types/bookingType';

type InitialType = {
  error: string;
  booking: BookingType | BookingType[];
};

const initialState: InitialType = {
  error: '',
  booking: []
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
    default:
      return state;
  }
};

export default bookingReducer;

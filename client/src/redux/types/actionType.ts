import {
  GET_ALL_ROOMS,
  GET_ROOM,
  FETCH_ERROR,
  START_LOADING,
  FINISH_LOADING,
  SIGN_UP,
  LOGIN,
  START_LOGIN,
  FINISH_LOGIN,
  LOGOUT,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  BOOK_ROOM,
  BOOK_ROOM_ERROR,
  START_LOADING_BOOK,
  FINISH_LOADING_BOOK,
  GET_ALL_BOOKING,
  GET_AVAILABLE,
  GET_BOOKED,
  SUBMIT_REVIEW,
  ADD_ROOM,
  UPDATE_ROOM
} from '../actions/constant';
import { BookingReturn } from './bookingType';
import { AllRoomType, RoomType } from './roomType';

type GetAllRooms = {
  type: typeof GET_ALL_ROOMS;
  payload: AllRoomType;
};

type FetchError = {
  type: typeof FETCH_ERROR;
  payload: string;
};

type StartLoading = {
  type: typeof START_LOADING;
};

type FinishLoading = {
  type: typeof FINISH_LOADING;
};

type GetRoom = {
  type: typeof GET_ROOM;
  payload: RoomType;
};

type AddRoom = {
  type: typeof ADD_ROOM;
  payload: RoomType;
};

type UpdateRoom = {
  type: typeof UPDATE_ROOM;
  payload: RoomType;
};

export type ReturnUser = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'user';
};
export type Signup = {
  type: typeof SIGN_UP;
  payload: {
    user: ReturnUser;
    token: string;
  };
};

export type Login = {
  type: typeof LOGIN;
  payload: {
    user: ReturnUser;
    token: string;
  };
};

type StartLogin = {
  type: typeof START_LOGIN;
};

type FinishLogin = {
  type: typeof FINISH_LOGIN;
};

type ForgotPassword = {
  type: typeof FORGOT_PASSWORD;
  payload: string;
};

type ResetPassword = {
  type: typeof RESET_PASSWORD;
  payload: string;
};

type Logout = {
  type: typeof LOGOUT;
};

type CreateBooking = {
  type: typeof BOOK_ROOM;
};

type BookingError = {
  type: typeof BOOK_ROOM_ERROR;
  payload: string;
};

type StartBooking = {
  type: typeof START_LOADING_BOOK;
};

type FinishBooking = {
  type: typeof FINISH_LOADING_BOOK;
};

type GetBooking = {
  type: typeof GET_ALL_BOOKING;
  payload: BookingReturn[];
};

type GetAvailable = {
  type: typeof GET_AVAILABLE;
  payload: boolean;
};

type GetBooked = {
  type: typeof GET_BOOKED;
  payload: string[];
};

type SubmitReview = {
  type: typeof SUBMIT_REVIEW;
  payload: RoomType;
};

export type RoomActionType =
  | GetAllRooms
  | FetchError
  | StartLoading
  | FinishLoading
  | GetRoom
  | AddRoom
  | UpdateRoom
  | SubmitReview;

export type UserActionType =
  | Signup
  | Login
  | Logout
  | FetchError
  | StartLogin
  | FinishLogin
  | ForgotPassword
  | ResetPassword;

export type BookingActionType =
  | CreateBooking
  | BookingError
  | StartBooking
  | FinishBooking
  | GetAvailable
  | GetBooking
  | GetBooked;

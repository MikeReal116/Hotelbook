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
  BOOK_ROOM_ERROR
} from '../actions/constant';
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

type createBooking = {
  type: typeof BOOK_ROOM;
};

type BookingError = {
  type: typeof BOOK_ROOM_ERROR;
  payload: string;
};

export type RoomActionType =
  | GetAllRooms
  | FetchError
  | StartLoading
  | FinishLoading
  | GetRoom;

export type UserActionType =
  | Signup
  | Login
  | Logout
  | FetchError
  | StartLogin
  | FinishLogin
  | ForgotPassword
  | ResetPassword;

export type BookingActionType = createBooking | BookingError;

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
  LOGOUT
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

type Logout = {
  type: typeof LOGOUT;
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
  | FinishLogin;

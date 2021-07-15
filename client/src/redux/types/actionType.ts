import {
  GET_ALL_ROOMS,
  GET_ROOM,
  FETCH_ERROR,
  START_LOADING,
  FINISH_LOADING
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

type getRoom = {
  type: typeof GET_ROOM;
  payload: RoomType;
};

export type RoomActionType =
  | GetAllRooms
  | FetchError
  | StartLoading
  | FinishLoading
  | getRoom;

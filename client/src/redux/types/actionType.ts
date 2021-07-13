import {
  GET_ALL_ROOMS,
  FETCH_ERROR,
  START_LOADING,
  FINISH_LOADING
} from '../actions/constant';
import { AllRoomType } from './roomType';

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

export type RoomActionType =
  | GetAllRooms
  | FetchError
  | StartLoading
  | FinishLoading;

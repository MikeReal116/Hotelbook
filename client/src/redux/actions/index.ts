import { Dispatch } from 'redux';

import {
  GET_ALL_ROOMS,
  FETCH_ERROR,
  START_LOADING,
  FINISH_LOADING
} from './constant';
import { RoomActionType } from '../types/actionType';
import axios from '../../axios/axios';

export const startLoading = (): RoomActionType => {
  return { type: START_LOADING };
};

export const finishLoading = (): RoomActionType => {
  return { type: FINISH_LOADING };
};

export const fetchError = (error: string): RoomActionType => {
  return { type: FETCH_ERROR, payload: error };
};

export const getAllRooms = () => async (dispatch: Dispatch<RoomActionType>) => {
  try {
    dispatch(startLoading());
    const { data } = await axios.get('/api/v1/rooms');
    dispatch({ type: GET_ALL_ROOMS, payload: data });
    dispatch(finishLoading());
  } catch (error) {
    dispatch(fetchError(error.response.data.message));
    dispatch(finishLoading());
  }
};
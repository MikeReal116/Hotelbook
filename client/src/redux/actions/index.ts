import { Dispatch } from 'redux';
import { History } from 'history';

import {
  GET_ALL_ROOMS,
  GET_ROOM,
  FETCH_ERROR,
  START_LOADING,
  FINISH_LOADING,
  LOGIN,
  SIGN_UP,
  START_LOGIN,
  FINISH_LOGIN,
  LOGOUT,
  FORGOT_PASSWORD,
  RESET_PASSWORD
} from './constant';
import { RoomActionType, UserActionType } from '../types/actionType';
import axios from '../../axios/axios';
import { UserType } from '../types/userTypes';

export const startLoading = (): RoomActionType => {
  return { type: START_LOADING };
};

export const finishLoading = (): RoomActionType => {
  return { type: FINISH_LOADING };
};

export const fetchError = (error: string): RoomActionType => {
  return { type: FETCH_ERROR, payload: error };
};

export const getAllRooms =
  (page = 1, search?: string) =>
  async (dispatch: Dispatch<RoomActionType>) => {
    try {
      dispatch(startLoading());
      const url = search
        ? `/api/v1/rooms?page=${page}&location=${search}`
        : `/api/v1/rooms?page=${page}`;
      const { data } = await axios.get(url);
      dispatch({ type: GET_ALL_ROOMS, payload: data });
      dispatch(finishLoading());
    } catch (error) {
      dispatch(fetchError(error.response.data.message));
      dispatch(finishLoading());
    }
  };

export const getRoom =
  (id: string) => async (dispatch: Dispatch<RoomActionType>) => {
    try {
      dispatch(startLoading());
      const { data } = await axios.get(`/api/v1/rooms/${id}`);
      dispatch({ type: GET_ROOM, payload: data });
      dispatch(finishLoading());
    } catch (error) {
      dispatch(fetchError(error.response.data.message));
      dispatch(finishLoading());
    }
  };

export const signup =
  (user: UserType, history: History) =>
  async (dispatch: Dispatch<UserActionType>) => {
    try {
      dispatch({ type: START_LOGIN });
      const { data } = await axios.post('/api/v1/users/signup', user);
      dispatch({ type: SIGN_UP, payload: data });
      history.push('/');
      dispatch({ type: FINISH_LOGIN });
    } catch (error) {
      dispatch(fetchError(error.response.data.message) as UserActionType);
      dispatch({ type: FINISH_LOGIN });
    }
  };

export const login =
  (email: string, password: string, history: History) =>
  async (dispatch: Dispatch<UserActionType>) => {
    try {
      dispatch({ type: START_LOGIN });
      const { data } = await axios.post('/api/v1/users/login', {
        email,
        password
      });
      dispatch({ type: LOGIN, payload: data });
      history.push('/');
      dispatch({ type: FINISH_LOGIN });
    } catch (error) {
      dispatch(fetchError(error.response.data.message) as UserActionType);
      dispatch({ type: FINISH_LOGIN });
    }
  };

export const forgotPassword =
  (email: string) => async (dispatch: Dispatch<UserActionType>) => {
    try {
      const { data } = await axios.post('/api/v1/users/forgotpassword', {
        email
      });
      dispatch({ type: FORGOT_PASSWORD, payload: data.message });
    } catch (error) {
      dispatch(fetchError(error.response.data.message) as UserActionType);
    }
  };

export const resetPassword =
  (id: string, token: string, password: string, resetPassword: string) =>
  async (dispatch: Dispatch<UserActionType>) => {
    try {
      const { data } = await axios.patch(
        `/api/v1/users/resetpassword/${id}/${token}`,
        { password, resetPassword }
      );
      dispatch({ type: RESET_PASSWORD, payload: data.message });
    } catch (error) {
      dispatch(fetchError(error.response.data.message) as UserActionType);
    }
  };

export const logout = (history: History) => {
  history.push('/auth');
  return { type: LOGOUT };
};

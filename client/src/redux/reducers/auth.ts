import {
  FETCH_ERROR,
  FINISH_LOGIN,
  LOGIN,
  LOGOUT,
  SIGN_UP,
  START_LOGIN
} from '../actions/constant';
import { ReturnUser, UserActionType } from '../types/actionType';

export type UserType = {
  user: ReturnUser;
  token: string;
};

type InitialState = {
  error: string;
  user: UserType | null;
  loading: boolean;
};

const initialState = {
  user: null,
  error: '',
  loading: false
};

const authReducer = (
  state: InitialState = initialState,
  action: UserActionType
): InitialState => {
  switch (action.type) {
    case START_LOGIN:
      return { user: null, error: '', loading: true };
    case FINISH_LOGIN:
      return { ...state, loading: false };
    case SIGN_UP:
      return { ...state, user: action.payload };
    case LOGIN:
      return { ...state, user: action.payload };
    case FETCH_ERROR:
      return { ...state, error: action.payload };
    case LOGOUT:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default authReducer;

import { combineReducers } from 'redux';
import authReducer from './auth';
import roomReducer from './room';

const reducers = combineReducers({
  rooms: roomReducer,
  user: authReducer
});

export default reducers;

export type RootStore = ReturnType<typeof reducers>;

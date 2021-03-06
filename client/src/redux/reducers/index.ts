import { combineReducers } from 'redux';
import authReducer from './auth';
import bookingReducer from './booking';
import roomReducer from './room';

const reducers = combineReducers({
  rooms: roomReducer,
  user: authReducer,
  booking: bookingReducer
});

export default reducers;

export type RootStore = ReturnType<typeof reducers>;

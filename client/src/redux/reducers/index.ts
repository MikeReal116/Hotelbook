import { combineReducers } from 'redux';
import roomReducer from './room';

const reducers = combineReducers({
  rooms: roomReducer
});

export default reducers;

export type RootStore = ReturnType<typeof reducers>;

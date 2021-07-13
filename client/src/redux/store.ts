import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers, { RootStore } from './reducers';

let composeEnhancers = compose;

const middlewares = [thunk];

const initialState: RootStore = {
  rooms: {
    loading: false,
    error: '',
    rooms: []
  }
};

if (process.env.NODE_ENV === 'development') {
  if ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      trace: true
    });
  }
}

const store = createStore(
  reducers,
  initialState,
  composeEnhancers(applyMiddleware(...middlewares))
);

export default store;

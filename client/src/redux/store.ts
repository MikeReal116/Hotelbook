import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers, { RootStore } from './reducers';
import { UserType } from './reducers/auth';

let composeEnhancers = compose;

const middlewares = [thunk];

const loadFromLocal = () => {
  try {
    const profile = localStorage.getItem('profile');
    return profile ? JSON.parse(profile) : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const setToLocal = (state: UserType | null) => {
  try {
    const profile = JSON.stringify(state);
    localStorage.setItem('profile', profile);
  } catch (error) {
    console.log(error);
  }
};

const initialState: RootStore = {
  rooms: {
    loading: false,
    error: '',
    rooms: []
  },
  user: {
    loading: false,
    error: '',
    user: loadFromLocal()
  },
  booking: {
    error: '',
    booking: []
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

store.subscribe(() => setToLocal(store.getState().user.user));

export default store;

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App';
import FormProvider from './context/FormProvider';
import store from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <FormProvider>
      <App />
    </FormProvider>
  </Provider>,
  document.getElementById('root')
);

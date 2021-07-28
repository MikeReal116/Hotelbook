import { useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import AuthPage from '../pages/AuthPage';
import BookingHistoryPage from '../pages/BookingHistoryPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import HomePage from '../pages/HomePage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import RoomDetailPage from '../pages/RoomDetailPage';
import { RootStore } from '../redux/reducers';

function App() {
  const user = useSelector((state: RootStore) => state.user);
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={() => <Redirect to='/rooms' />} />
        <Route path='/rooms' exact>
          <HomePage />
        </Route>
        <Route path='/auth' exact>
          {user ? <AuthPage /> : () => <Redirect to='/rooms' />}
        </Route>
        <Route path='/rooms/:id' exact>
          <RoomDetailPage />
        </Route>
        <Route path='/auth/forgotpassword' exact>
          {user ? <ForgotPasswordPage /> : () => <Redirect to='/rooms' />}
        </Route>
        <Route path='/auth/resetpassword/:id/:token' exact>
          <ResetPasswordPage />
        </Route>
        <Route path='/me' exact>
          {user ? <BookingHistoryPage /> : () => <Redirect to='/rooms' />}
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

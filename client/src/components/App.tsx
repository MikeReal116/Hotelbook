import { useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import AuthPage from '../pages/AuthPage';
import HomePage from '../pages/HomePage';
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
      </Switch>
    </BrowserRouter>
  );
}

export default App;

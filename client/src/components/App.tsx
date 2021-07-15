import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import RoomDetailPage from '../pages/RoomDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={() => <Redirect to='/rooms' />} />
        <Route path='/rooms' exact>
          <HomePage />
        </Route>
        <Route path='/rooms/:id' exact>
          <RoomDetailPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

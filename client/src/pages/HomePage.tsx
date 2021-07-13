import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Home from '../components/Home';
import Layout from '../components/Layout';
import { getAllRooms } from '../redux/actions';

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRooms());
  }, [dispatch]);

  return (
    <Layout>
      <Home />
    </Layout>
  );
};

export default HomePage;

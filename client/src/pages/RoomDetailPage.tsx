import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Detail from '../components/Detail';
import Layout from '../components/Layout';

import { getRoom } from '../redux/actions';

type IdParams = {
  id: string;
};

const RoomDetailPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams<IdParams>();

  useEffect(() => {
    dispatch(getRoom(id));
  }, [id, dispatch]);

  return (
    <Layout>
      <Detail />
    </Layout>
  );
};

export default RoomDetailPage;

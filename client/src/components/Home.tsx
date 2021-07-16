import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

import Pagination from './Pagination';
import { RootStore } from '../redux/reducers';
import Card from './Card';
import { getAllRooms } from '../redux/actions';
import Search from './Search';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4)
  },
  pages: {
    marginTop: theme.spacing(4),
    display: 'flex',
    justifyContent: 'flex-end'
  }
}));

const Home = () => {
  const { rooms, loading, error, itemsPerPage, filteredRoomCount } =
    useSelector((state: RootStore) => state.rooms);
  const dispatch = useDispatch();
  const classes = useStyles();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '1', 10);
  const hotelLocation = query.get('location');

  useEffect(() => {
    dispatch(getAllRooms(page));
  }, [page, dispatch]);

  useEffect(() => {
    if (hotelLocation) {
      dispatch(getAllRooms(undefined, hotelLocation));
    }
  }, [hotelLocation, dispatch]);

  if (loading && !rooms.length) {
    return <CircularProgress />;
  }
  if (!loading && error) {
    return <Typography>{error}</Typography>;
  }
  return (
    <>
      <CssBaseline />
      <Container className={classes.root}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant='h6' color='textSecondary'>
              {hotelLocation
                ? `Hotels in ${hotelLocation}`
                : 'Find deals on Hotels'}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Search />
          </Grid>
          {rooms.map((room) => (
            <Card
              key={room._id}
              image={room.images[0]}
              name={room.name}
              price={room.price}
              description={room.description}
              id={room._id}
            />
          ))}
        </Grid>
        <div className={classes.pages}>
          {filteredRoomCount &&
            itemsPerPage &&
            filteredRoomCount > itemsPerPage && (
              <Pagination
                page={page}
                itemsPerPage={itemsPerPage}
                filteredRoomCount={filteredRoomCount}
              />
            )}
        </div>
      </Container>
    </>
  );
};

export default Home;

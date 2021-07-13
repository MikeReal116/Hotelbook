import { useSelector } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

import { RootStore } from '../redux/reducers';
import Card from './Card';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(4)
  }
}));

const Home = () => {
  const { rooms, loading, error } = useSelector(
    (state: RootStore) => state.rooms
  );

  const classes = useStyles();

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
          {rooms.map((room) => (
            <Card
              key={room._id}
              image={room.images[0]}
              name={room.name}
              price={room.price}
              rating={room.rating as number}
              numberOfRating={room.numberOfRating as number}
            />
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Home;

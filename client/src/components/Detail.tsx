import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Container from '@material-ui/core/Container';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import CircularProgress from '@material-ui/core/CircularProgress';
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import moment from 'moment';

import { RootStore } from '../redux/reducers';
import DatePicker from './DatePicker';
import { getAvailable, getBooked, getBooking } from '../redux/actions';
import makePayment from '../utils/stripe';
import Review from './Review';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(8)
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2)
  },
  card: {
    padding: theme.spacing(2),
    height: '100%'
  },
  btn: {
    marginTop: theme.spacing(2),
    width: '77%'
  }
}));

const Detail = () => {
  const classes = useStyles();
  const [startDate, setStartDate] = useState<null | Date>(null);
  const [endDate, setEndDate] = useState<null | Date>(null);
  const dispatch = useDispatch();
  const { room, loading, error } = useSelector(
    (state: RootStore) => state.rooms
  );
  const { user } = useSelector((state: RootStore) => state.user);
  const { isAvailable, booking } = useSelector(
    (state: RootStore) => state.booking
  );

  const roomId = room && room._id;
  const userEmail = user && user.user.email;

  useEffect(() => {
    if (roomId) {
      dispatch(getBooked(roomId));
    }
  }, [dispatch, roomId]);

  useEffect(() => {
    if (userEmail) {
      dispatch(getBooking());
    }
  }, [dispatch, userEmail]);

  const handleDateChange = (dates: Date | [Date, Date] | null) => {
    const [start, end] = dates as [Date, Date];
    setStartDate(start);
    setEndDate(end);
    if (start && end) {
      const id = room ? room._id : '';
      dispatch(
        getAvailable(
          id,
          new Date(start).toISOString(),
          new Date(end).toISOString()
        )
      );
    }
  };

  const handleButtonCheckoutClick = () => {
    if (startDate && endDate) {
      const start = +new Date(startDate);
      const end = +new Date(endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (24 * 60 * 60 * 1000));
      const amount = room ? room.price * diffDays : 0;
      const roomId = room ? room._id : '';

      makePayment(
        roomId,
        startDate.toISOString(),
        endDate.toISOString(),
        diffDays,
        amount
      );
    }
  };

  const checkUser = () => {
    if (booking.length && roomId && userEmail) {
      const found = booking.find((book) => book.roomId._id === roomId);
      return found ? true : false;
    }
    return false;
  };

  if (loading && !room && !error) {
    return <CircularProgress />;
  }

  return (
    <Container className={classes.root}>
      {room ? (
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant='h6' paragraph>
              {room.name}
            </Typography>
            <div className={classes.header}>
              <LocationOnIcon />
              <Typography>{room.address}</Typography>
            </div>
            <Typography
              variant='subtitle2'
              paragraph
            >{`${room.price}???/ night`}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Carousel autoPlay>
              {room.images.map((image) => (
                <div key={image}>
                  <img alt={room.name} src={image} />
                </div>
              ))}
            </Carousel>
          </Grid>
          <Grid container justifyContent='space-between'>
            <Grid item xs={12} md={6}>
              <Typography variant='body2'>{room.description}</Typography>
            </Grid>

            <Grid item xs={12} md={3}>
              <DatePicker
                handleDateChange={handleDateChange}
                startDate={startDate}
                endDate={endDate}
              />
              {!user && <Typography>Login to book</Typography>}
              {isAvailable && user && (
                <Button
                  variant='contained'
                  color='primary'
                  className={classes.btn}
                  onClick={handleButtonCheckoutClick}
                >
                  Checkout
                </Button>
              )}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='subtitle2' paragraph>
              Comes with
            </Typography>
            {room.WiFi ? (
              <Typography variant='body2' paragraph>
                WiFi
              </Typography>
            ) : null}
            {room.breakfast ? (
              <Typography variant='body2' paragraph>
                Breakfast
              </Typography>
            ) : null}
            <Typography variant='body2' paragraph>
              No of Beds: {room.numberOfBeds}
            </Typography>
            <Typography variant='body2' paragraph>
              Guest capacity: {room.guestCapacity}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='subtitle2' paragraph>
              Reviews
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                {checkUser() && <Review id={room._id} />}
              </Grid>
              {room.review?.length
                ? room.review.map((review) => (
                    <Grid item xs={12} sm={6} md={4} key={review._id}>
                      <Card className={classes.card}>
                        <Typography variant='body1' paragraph>
                          {review.reviewerName}
                        </Typography>
                        <Typography variant='body2' paragraph>
                          {review.review}
                        </Typography>
                        <Rating
                          name='read-only'
                          value={review.rating}
                          readOnly
                        />
                        <Typography variant='body2' paragraph>
                          {moment(review.createdAt).fromNow()}
                        </Typography>
                      </Card>
                    </Grid>
                  ))
                : null}
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <p></p>
      )}
    </Container>
  );
};

export default Detail;

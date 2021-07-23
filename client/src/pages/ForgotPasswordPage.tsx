import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';

import Input from '../components/Input';
import Layout from '../components/Layout';
import { RootStore } from '../redux/reducers';
import { forgotPassword } from '../redux/actions';

const useStyles = makeStyles(() => ({
  container: {
    marginTop: 30
  }
}));

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const classes = useStyles();
  const dispatch = useDispatch();
  const { error, resetMessage } = useSelector((state: RootStore) => state.user);

  useEffect(() => {
    if (resetMessage) {
      toast.success(resetMessage);
    }
    if (error) {
      toast.error(error);
    }
  }, [resetMessage, error]);

  const handleSendClick = () => {
    dispatch(forgotPassword(email));
  };

  return (
    <Layout>
      <Container maxWidth='sm' className={classes.container}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h6'>Reset password</Typography>
          </Grid>
          <Input
            name='email'
            label='Email'
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <Grid item xs={12}>
            <Button
              variant='contained'
              fullWidth
              color='primary'
              onClick={handleSendClick}
            >
              Send
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant='body2'
              component={Link}
              to='/auth'
              color='primary'
            >
              Login
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default ForgotPassword;

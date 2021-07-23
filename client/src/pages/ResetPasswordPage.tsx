import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  Button,
  Container,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';
import { toast } from 'react-toastify';

import Input from '../components/Input';
import Layout from '../components/Layout';
import { RootStore } from '../redux/reducers';
import { resetPassword } from '../redux/actions';

const useStyles = makeStyles(() => ({
  container: {
    marginTop: 30
  }
}));

type ParamType = {
  id: string;
  token: string;
};
const ResetPasswordPage = () => {
  const [passwordInput, setPasswordInput] = useState({
    password: '',
    repeatPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id, token } = useParams<ParamType>();
  const { error, resetMessage } = useSelector((state: RootStore) => state.user);

  useEffect(() => {
    if (resetMessage) {
      toast.success(resetMessage);
    }
    if (error) {
      toast.error(error);
    }
  }, [resetMessage, error]);

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setPasswordInput({ ...passwordInput, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword((preValue) => !preValue);
  };

  const handleSendClick = () => {
    dispatch(
      resetPassword(
        id,
        token,
        passwordInput.password,
        passwordInput.repeatPassword
      )
    );
  };

  return (
    <Layout>
      <Container maxWidth='sm' className={classes.container}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h6'>Reset password</Typography>
          </Grid>
          <Input
            name='password'
            label='Password'
            value={passwordInput.password}
            type='password'
            showPassword={showPassword}
            handleClickShowPassword={handleClickShowPassword}
            handleChange={handlePasswordChange}
          />
          <Input
            name='repeatPassword'
            label='Repeat Password'
            value={passwordInput.repeatPassword}
            type='password'
            handleChange={handlePasswordChange}
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

export default ResetPasswordPage;

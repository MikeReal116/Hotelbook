import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { toast } from 'react-toastify';

import Input from '../components/Input';
import { signup, login } from '../redux/actions';
import { RootStore } from '../redux/reducers';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  signup: {
    cursor: 'pointer'
  }
}));

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [userInput, setUserInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const { error, loading } = useSelector((state: RootStore) => state.user);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    }
  }, [error]);

  const handleClickShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSignUpClick = () => {
    setIsLogin((prevState) => !prevState);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLogin) {
      return dispatch(login(userInput.email, userInput.password, history));
    }
    dispatch(signup(userInput, history));
  };

  const disableButton = isLogin
    ? userInput.email === '' || userInput.password === ''
    : userInput.email === '' ||
      userInput.password === '' ||
      userInput.firstName === '' ||
      userInput.lastName === '';

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          {isLogin ? `Login` : `Sign up`}
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {!isLogin && (
              <>
                <Input
                  name='firstName'
                  label='First Name'
                  half={true}
                  value={userInput.firstName}
                  handleChange={handleChange}
                />
                <Input
                  name='lastName'
                  label='Last Name'
                  half={true}
                  value={userInput.lastName}
                  handleChange={handleChange}
                />
              </>
            )}
            <Input
              name='email'
              label='Email Address'
              value={userInput.email}
              handleChange={handleChange}
            />
            <Input
              name='password'
              label='Password'
              type={showPassword ? 'text' : 'password'}
              handleClickShowPassword={handleClickShowPassword}
              showPassword={showPassword}
              value={userInput.password}
              handleChange={handleChange}
            />
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            disabled={disableButton}
          >
            {loading ? <CircularProgress /> : isLogin ? 'Log In' : 'Sign Up'}
          </Button>
          <Grid container justifyContent='space-between'>
            {isLogin && (
              <Grid item xs={6}>
                <Typography
                  variant='body2'
                  component={Link}
                  to='/auth/forgotpassword'
                  color='primary'
                >
                  Forgot password?
                </Typography>
              </Grid>
            )}
            <Grid item>
              <Typography
                variant='body2'
                onClick={handleSignUpClick}
                className={classes.signup}
                color='primary'
              >
                {isLogin
                  ? 'No account? Sign up'
                  : 'Already have an account? Sign in'}
              </Typography>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Auth;

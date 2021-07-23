import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import { Avatar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import HotelIcon from '@material-ui/icons/Hotel';
import { makeStyles } from '@material-ui/core/styles';

import { RootStore } from '../redux/reducers';
import { logout } from '../redux/actions';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex'
  },
  left: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center'
  },
  button: {
    textTransform: 'none'
  },
  title: {
    marginLeft: theme.spacing(2),
    color: '#fff',
    textDecoration: 'none'
  },
  avatar: {
    padding: theme.spacing()
  }
}));

const Header = () => {
  const { user } = useSelector((state: RootStore) => state.user);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleButtonClick = () => {
    if (user) {
      dispatch(logout(history));
    }
  };

  return (
    <AppBar position='relative'>
      <Toolbar className={classes.toolbar}>
        <div className={classes.left}>
          <HotelIcon />
          <Typography
            variant='h6'
            color='inherit'
            noWrap
            className={classes.title}
            component={Link}
            to={'/'}
          >
            Booking
          </Typography>
        </div>
        {user && (
          <Typography variant='subtitle2'>
            {`Welcome back  ${user.user.firstName}`}{' '}
          </Typography>
        )}
        {user && (
          <span className={classes.avatar}>
            <Avatar>{user.user.firstName.charAt(0)}</Avatar>
          </span>
        )}
        <Button
          variant='contained'
          color='primary'
          className={classes.button}
          component={Link}
          to='/auth'
          onClick={handleButtonClick}
        >
          {user ? 'Logout' : 'Login'}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

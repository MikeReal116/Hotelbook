import { useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import { Avatar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import HotelIcon from '@material-ui/icons/Hotel';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

import { RootStore } from '../redux/reducers';
import { logout } from '../redux/actions';
import formContext from '../context/formContext';

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { changeFormId } = useContext(formContext);
  const { user } = useSelector((state: RootStore) => state.user);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleButtonClick = () => {
    if (user) {
      dispatch(logout(history));
    }
  };

  const handleClickBooking = () => {
    history.push('/me');
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAvatarClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickAddroom = () => {
    changeFormId();
    history.push('/rooms/add');
    setAnchorEl(null);
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
            <Avatar onClick={handleAvatarClick}>
              {user.user.firstName.charAt(0)}
            </Avatar>
            <Menu
              id='simple-menu'
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClickBooking}>My bookings</MenuItem>
              {user && user.user.role === 'admin' && (
                <MenuItem onClick={handleClickAddroom}>Add Room</MenuItem>
              )}
            </Menu>
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

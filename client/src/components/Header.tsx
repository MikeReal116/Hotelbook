import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import HotelIcon from '@material-ui/icons/Hotel';
import { makeStyles } from '@material-ui/core/styles';

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
  }
}));

const Header = () => {
  const classes = useStyles();
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
        <Button variant='contained' color='primary' className={classes.button}>
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

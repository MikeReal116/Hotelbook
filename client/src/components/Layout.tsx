import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './Header';
import Footer from './Footer';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  main: {
    flexGrow: 1
  },
  footer: {
    marginTop: 'auto',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200]
  }
}));

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const classes = useStyles();
  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Box className={classes.main}>
          {children}
          <ToastContainer position='bottom-right' />
        </Box>
        <Grid item xs={12} className={classes.footer}>
          <Footer />
        </Grid>
      </Grid>
    </>
  );
};

export default Layout;

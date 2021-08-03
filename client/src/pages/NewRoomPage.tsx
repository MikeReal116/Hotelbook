import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form } from 'formik';

import Layout from '../components/Layout';
import TextField from '../components/TextField';
import { addRoom, updateRoom } from '../redux/actions';
import formContext from '../context/formContext';
import { RootStore } from '../redux/reducers';

const formValidation = yup.object().shape({
  name: yup.string().required('Required'),
  address: yup.string().required('Required'),
  price: yup.number().required('Required'),
  description: yup.string().required('Required'),
  WiFi: yup.boolean(),
  breakfast: yup.boolean(),
  numberOfBeds: yup.number(),
  images: yup.string().required('Required'),
  guestCapacity: yup.number()
});

let initialState = {
  name: '',
  address: '',
  price: 0,
  description: '',
  WiFi: true,
  breakfast: true,
  numberOfBeds: 0,
  images: '',
  guestCapacity: 0
};

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 20
  }
}));

const NewRoomPage = () => {
  const { formId } = useContext(formContext);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const room = useSelector((state: RootStore) =>
    formId ? state.rooms.rooms.find((room) => room._id === formId) : null
  );

  if (room) {
    initialState = {
      name: room.name,
      address: room.address,
      price: room.price,
      description: room.description,
      WiFi: room.WiFi as boolean,
      breakfast: room.breakfast as boolean,
      numberOfBeds: room.numberOfBeds as number,
      images: room.images.join(),
      guestCapacity: room.guestCapacity as number
    };
  }
  return (
    <Layout>
      <Formik
        initialValues={{ ...initialState }}
        validationSchema={formValidation}
        onSubmit={(values) => {
          if (room) {
            dispatch(updateRoom(room._id, values, history));
            return;
          }
          dispatch(addRoom(values, history));
        }}
      >
        {(props) => (
          <Form>
            <Container maxWidth='md' className={classes.root}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography paragraph variant='h6'>
                    {room ? 'Edit room' : 'Add a new room'}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField name='name' label='Hotel Name' required={true} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField name='address' label='Address' required={true} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField name='price' label='Price' required={true} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    name='images'
                    label='Images separated by comma'
                    required={true}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField name='breakfast' label='Breakfast (true/false) ' />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField name='WiFi' label='WiFi (true/false)' />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField name='numberOfBeds' label='No. of Beds' />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField name='guestCapacity' label='No. of Guest' />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name='description'
                    label='Description'
                    required={true}
                    multiline={true}
                    maxRows={3}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant='contained'
                    color='primary'
                    type='submit'
                    disabled={!(props.isValid && props.dirty)}
                  >
                    {room ? 'Update' : 'Send'}
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default NewRoomPage;

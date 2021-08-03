import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { RootStore } from '../redux/reducers';
import formContext from '../context/formContext';

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
  },
  cardMedia: {
    paddingTop: '56.25%' // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  button: {
    textTransform: 'none'
  },
  editBtn: {
    position: 'absolute',
    left: 0,
    top: 0
  }
}));

type CardProps = {
  image: string;
  name: string;
  price: number;
  description: string;
  id: string;
};

const formatText = (text: string) => {
  const newText = text.slice(0, 80);
  return newText.padEnd(85, '.');
};

const CardComponent = ({ image, name, price, description, id }: CardProps) => {
  const { changeFormId } = useContext(formContext);
  const history = useHistory();
  const classes = useStyles();
  const { user } = useSelector((state: RootStore) => state.user);

  const handleClick = (id: string) => {
    history.push(`/rooms/${id}`);
  };

  const handleClickEdit = (roomId: string) => {
    changeFormId(roomId);
    history.push('/rooms/add');
    console.log('me');
  };

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card className={classes.card}>
        {user && user.user.role === 'admin' && (
          <IconButton
            aria-label='edit'
            className={classes.editBtn}
            onClick={() => handleClickEdit(id)}
          >
            <MoreVertIcon />
          </IconButton>
        )}
        <CardMedia className={classes.cardMedia} image={image} title={name} />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant='subtitle2' paragraph>
            {name}
          </Typography>
          <Typography
            variant='subtitle2'
            paragraph
          >{`${price}€ / night`}</Typography>
          <Typography paragraph variant='body2'>
            {formatText(description)}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant='contained'
            color='primary'
            className={classes.button}
            fullWidth
            onClick={() => handleClick(id)}
          >
            View Detail
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default CardComponent;

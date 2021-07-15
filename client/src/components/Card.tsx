import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardMedia: {
    paddingTop: '56.25%' // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  button: {
    textTransform: 'none'
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
  const history = useHistory();
  const classes = useStyles();

  const handleClick = (id: string) => {
    history.push(`/rooms/${id}`);
  };

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card className={classes.card}>
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

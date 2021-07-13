import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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
  rating: number;
  numberOfRating: number;
};

const CardComponent = ({
  image,
  name,
  price,
  rating,
  numberOfRating
}: CardProps) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card className={classes.card}>
        <CardMedia className={classes.cardMedia} image={image} title={name} />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant='h6' component='h2' paragraph>
            {name}
          </Typography>
          <Typography
            variant='subtitle2'
            paragraph
          >{`${price}$ / night`}</Typography>
          <Typography variant='body2' paragraph>
            {rating} {numberOfRating}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant='contained'
            color='primary'
            className={classes.button}
            fullWidth
          >
            View Detail
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default CardComponent;

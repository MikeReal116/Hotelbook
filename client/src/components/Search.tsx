import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Grid, OutlinedInput } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    height: '80%',
    marginTop: theme.spacing(1)
  }
}));

const Search = () => {
  const [search, setSearch] = useState('');
  const history = useHistory();
  const classes = useStyles();
  const disableButton = search === '' ? true : false;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSearch(e.target.value);
  };

  const handleClick = () => {
    history.push(`/rooms/?location=${search}`);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={8}>
        <OutlinedInput
          id='search-term'
          value={search}
          onChange={handleChange}
          aria-describedby='search-city'
          fullWidth={true}
          inputProps={{
            'aria-label': 'weight'
          }}
          labelWidth={0}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Button
          variant='contained'
          color='primary'
          className={classes.button}
          disabled={disableButton}
          onClick={handleClick}
        >
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

export default Search;

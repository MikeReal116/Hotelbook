import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { submitReview } from '../redux/actions';

type PropType = {
  id: string;
};
const Review = ({ id }: PropType) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [formInput, setFormInput] = useState({
    rating: 5,
    review: ''
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickSend = () => {
    if (formInput.rating !== null) {
      dispatch(
        submitReview(id, { rating: formInput.rating, review: formInput.review })
      );
    }
    setOpen(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };

  const disabled = formInput.rating && formInput.review ? false : true;

  return (
    <div>
      <Button variant='outlined' color='primary' onClick={handleClickOpen}>
        Leave Review
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='review-form-title'
      >
        <DialogTitle id='review-form-title'>Review</DialogTitle>
        <DialogContent>
          <DialogContentText>Tell us about your experience</DialogContentText>
          <TextField
            id='rating'
            label='Rating 0-5'
            type='number'
            required
            value={formInput.rating}
            name='rating'
            onChange={onChange}
          />
          <TextField
            id='review'
            label='Review'
            name='review'
            type='text'
            value={formInput.review}
            required
            fullWidth
            onChange={onChange}
          />
          <DialogActions>
            <Button color='primary' onClick={handleClose}>
              Cancel
            </Button>
            <Button
              color='primary'
              disabled={disabled}
              onClick={handleClickSend}
            >
              Send
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Review;

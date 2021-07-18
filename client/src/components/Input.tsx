import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';

type InputType = {
  name: string;
  label: string;
  type?: string;
  half?: boolean;
  value: string;
  handleChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  showPassword?: boolean;
  handleClickShowPassword?: () => void;
};

const Input = ({
  name,
  label,
  type,
  half,
  value,
  handleChange,
  handleClickShowPassword,
  showPassword
}: InputType) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        variant='outlined'
        required
        value={value}
        onChange={handleChange}
        fullWidth
        type={type}
        label={label}
        InputProps={
          name === 'password'
            ? {
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      edge='end'
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }
            : {}
        }
      />
    </Grid>
  );
};

export default Input;

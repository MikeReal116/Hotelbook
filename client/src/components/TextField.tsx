import TextField from '@material-ui/core/TextField';
import { useField } from 'formik';

type PropType = {
  name: string;
  label: string;
  required?: boolean;
  [x: string]: any;
};

type LooseObj = {
  [key: string]: any;
};

const TextFieldComponent = ({
  name,
  required,
  label,
  ...otherProps
}: PropType) => {
  const [field, meta] = useField(name);

  const configObj: LooseObj = {
    ...field,
    ...otherProps,
    fullWidth: true,
    label: label,
    required: required,
    variant: 'outlined' as 'outlined'
  };

  if (meta && meta.touched && meta.error) {
    configObj.error = true;
    configObj.helperText = meta.error;
  }

  return <TextField {...configObj} />;
};

export default TextFieldComponent;

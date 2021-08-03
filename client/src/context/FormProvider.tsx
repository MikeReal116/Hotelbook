import { useState } from 'react';
import FormContext from './formContext';

type PropType = {
  children: React.ReactNode;
};
const FormProvider = ({ children }: PropType) => {
  const [formId, setFormId] = useState('');

  const changeFormId = (id?: string) => {
    if (id) {
      setFormId(id);
    } else {
      setFormId('');
    }
  };

  const value = {
    formId,
    changeFormId
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

export default FormProvider;

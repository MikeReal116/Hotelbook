import React from 'react';

const initialValues = {
  formId: '',
  changeFormId: (id?: string) => {}
};

const formContext = React.createContext(initialValues);

export default formContext;

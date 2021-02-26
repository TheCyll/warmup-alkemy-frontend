import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const FormPost = () => {

  const initValues = {
    concern: '',
    amount: '',
    date: '',
    type: ''
  }

  return (    
    <Formik 
      initialValues={/*initialValuesEdit || */ initValues}
      enableReinitialize={true}
      validationSchema={Yup.object({
        title: Yup.string().trim().max(50, 'Debe tener 50 carácteres o menos').required('El campo es requerido'),
        body: Yup.string().trim().max(512, 'Debe tener 512 carácteres o menos').required('El campo es requerido'),
        userId: Yup.number().required('El campo es requerido')        
      })}
      // onSubmit={(values, { setSubmitting }) => {
      //   onHandleSubmit(values);        
      //   setSubmitting(false);
      // }} 
    >
    <Form /*id={id}*/ className="post-form flex-container" noValidate>      
      <label htmlFor="concern">Concepto</label>
      <Field name="concern" type="text" />
      <ErrorMessage component="span" className="error-message" name="concern" />  

      <label htmlFor="amount">Monto</label>
      <Field name="amount" type="number" />
      <ErrorMessage component="span" className="error-message" name="amount" /> 

      <button type="submit">Guardar</button>                
    </Form>
    </Formik>
  )
  
}

export default FormPost;

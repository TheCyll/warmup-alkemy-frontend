import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const FormPost = ({ initValuesPost, toggleForm, onHandleSubmit }) => {

  const initValues = {
    title: '',
    body: '',
    userId: ''
  } 

  return (
    <Formik 
      initialValues={initValuesPost ||  initValues}
      enableReinitialize={true}
      validationSchema={Yup.object({
        title: Yup.string().trim().max(50, 'Title needs to be 50 characters or less').required('The field is required'),
        body: Yup.string().trim().max(512, 'Body needs to be 512 characters or less').required('The field is required'),
        userId: Yup.number().required('This field should be a number')       
      })}
      onSubmit={(values, { setSubmitting }) => {
        onHandleSubmit(values);        
        setSubmitting(false);
      }} 
    >
    <Form className="modal flex-container" noValidate>

      <div className="close-modal" onClick={ toggleForm }>X</div>                  

      <label htmlFor="title">Title</label>
      <Field name="title" type="text" />
      <ErrorMessage component="span" className="error-message" name="title" />        

      <label htmlFor="body">Body</label>
      <Field name="body" as="textarea"/>
      <ErrorMessage component="span" className="error-message" name="body" /> 

      <label htmlFor="userId">User ID</label>
      <Field name="userId" type="number" />
      <ErrorMessage component="span" className="error-message" name="userId" /> 

      <button type="submit" className="button accept">Save</button>                
    </Form>
    </Formik>    
  )  
}

export default FormPost;

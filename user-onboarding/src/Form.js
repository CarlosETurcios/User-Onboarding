import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const UserForm = ({ values, errors, touched, status }) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    console.log('status has changed!', status);

    status && setUser(user => [...user, status]);
  }, [status]);

  return (
    <div className='user-form'>
      <Form>
        <label htmlFor='name'>
          Name
          <Field id='name' type='text' name='name' placeholder='Name' />
          {touched.name && errors.name && (
            <p className='errors'>{errors.name}</p>
          )}
        </label>
        <label htmlFor='email'>
          Email
          <Field id='email' type='text' name='email' placeholder='Email' />
          {touched.email && errors.email && (
            <p className='errors'>{errors.email}</p>
          )}
        </label>
        <label htmlFor='password'>
          Password
          <Field
            id='password'
            type='password'
            name='password'
            placeholder='Password'
          />
          {touched.password && errors.password && (
            <p className='errors'>{errors.password}</p>
          )}
        </label>
        <label className='checkmark'>
          Terms of Service
          <Field type='checkbox' name='tof' checked={values.tof} />
          <span className='checkmark' />
        </label>
        <button type='submit'>Submit</button>
      </Form>

      {user.map(user => {
        return (
          <ul key={user.id}>
            <li>Name: {user.name}</li>
            <li>Email: {user.email}</li>
            <li>Password: {user.password}</li>
          </ul>
        );
      })}
    </div>
  );
};

const FormikUserForm = withFormik({
  mapPropsToValues({ name, email, password, tof }) {
    return {
      name: name || '',
      email: email || '',
      password: password || '',
      tof: tof || false
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().required(),
    password: Yup.string().required('Password is Mandatory')
  }),

  handleSubmit(values, { setStatus, resetForm }) {
    console.log('submitting', values);

    axios
      .post('https://reqres.in/api/users', values)
      .then(res => {
        console.log(res);
        setStatus(res.data);

        resetForm();
      })
      .catch(err => console.log(err.response));
  }
})(UserForm);

export default FormikUserForm;

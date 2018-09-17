import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';


const user = {
  email:' laex@dsd.com',
  firstName: 'alex',
  lastName: 'pezikov',
};

const userScheme = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),

    firstName: Yup.string()
      .required('Required')
      .min(2, 'Too short')
      .max(100, 'Too long'),

    lastName: Yup.string()
      .required('Required')
      .min(2, 'Too short')
      .max(100, 'Too long'),
});

const App = props => (
  <div>
    <Formik
      initialValues={user}
      validationSchema={userScheme}
      onSubmit={(values, actions) => {
        console.log(values);
      }}
      render={({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
      })=> (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && touched.email && <div>{errors.email}</div>}
          <br /><br />
          <input
            type="text"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
          />
          {errors.firstName && touched.firstName && <div>{errors.firstName}</div>}

          <input type="submit" value="Save" />
        </form>
      )}
    />
  </div>
);

export default App;

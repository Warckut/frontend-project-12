import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required(),
  password: yup.string().required(),
});

const Login = () => (
  <>
    <h2>LOGIN</h2>
    <Formik
      initialValues={{ name: '', password: '' }}
      validationSchema={schema}
      onSubmit={(values) => {
        // eslint-disable-next-line functional/no-expression-statements
        console.log(values);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit}>
          { errors.name && touched.name && errors.name }
          <input
            type="text"
            name="name"
            onBlur={handleBlur}
            value={values.name}
            onChange={handleChange}
          />
          { errors.password && touched.password && errors.password }
          <input
            type="password"
            name="password"
            onBlur={handleBlur}
            value={values.password}
            onChange={handleChange}
          />
          <button type="submit" disabled={isSubmitting}>Войти</button>
        </form>
      )}
    </Formik>
  </>
);

export default Login;

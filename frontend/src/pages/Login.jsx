import React from 'react';
import {
  Navigate,
  useLocation,
} from 'react-router-dom';
import { Formik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import * as yup from 'yup';
import axios from 'axios';

import useAuth from '../hooks';
import routes from '../routes';

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

const Login = () => {
  const location = useLocation();
  const { loggedIn, logIn } = useAuth();

  if (loggedIn) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={schema}
      onSubmit={(values) => {
        axios.post(routes.loginPath(), values).then((response) => {
          window.localStorage.setItem('userId', response.data.token);
          logIn();
        });
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
        <Form className="col-4 mt-5 mx-auto shadow p-4 mb-5 bg-body rounded" onSubmit={handleSubmit}>
          <h2 className="text-center">LOGIN</h2>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="nameInput">Name</Form.Label>
            <Form.Control
              type="text"
              name="username"
              className="form-control"
              onBlur={handleBlur}
              value={values.username}
              onChange={handleChange}
            />
            { errors.username && touched.username && <p style={{ color: 'red' }}>{errors.username}</p> }
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              className="form-control"
              onBlur={handleBlur}
              value={values.password}
              onChange={handleChange}
            />
            { errors.password && touched.password && <p style={{ color: 'red' }}>{errors.password}</p> }
          </Form.Group>
          <Button type="submit" disabled={isSubmitting}>Войти</Button>
        </Form>
      )}
    </Formik>
  );
};

export default Login;

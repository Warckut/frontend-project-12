import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import {
  Form,
  Button,
  Col,
  Row,
  Card,
  Container,
} from 'react-bootstrap';

import routes from '../../routes';
import useAuth from '../../hooks';

const Login = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { loggedIn, logIn } = useAuth();
  const [resErr, setResErr] = useState(null);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object().shape({
      username: yup.string().required(t('validation.required')),
      password: yup.string().required(t('validation.required')),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      setResErr(null);
      try {
        const res = await axios.post(routes.loginPath(), values);
        localStorage.setItem('userData', JSON.stringify(res.data));
        logIn(res.data);
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 401) {
          setResErr(t('validation.unauth'));
          return;
        }
        throw err;
      }
    },
  });

  if (loggedIn) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-sm-4 col-md-4">
          <Card>
            <Card.Body>
              <Form onSubmit={formik.handleSubmit}>
                <h2 className="text-center">{t('login')}</h2>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="nameInput">{t('username')}</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    className="form-control"
                    value={formik.values.username}
                    isInvalid={formik.errors.username || resErr}
                    onChange={formik.handleChange}
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    className="invalid-feedback"
                  >
                    {formik.errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>{t('password')}</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    className="form-control"
                    value={formik.values.password}
                    isInvalid={formik.errors.password || resErr}
                    onChange={formik.handleChange}
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    className="invalid-feedback"
                  >
                    { formik.errors.password }
                    { resErr }
                  </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" disabled={formik.isSubmitting}>{t('login')}</Button>
              </Form>
            </Card.Body>
            <Card.Footer>
              <div className="text-center">
                <span>Нет аккаунта? </span>
                <a href="/signup">Регистрация</a>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

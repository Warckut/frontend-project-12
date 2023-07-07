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

const SignUp = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { loggedIn, logIn } = useAuth();
  const [resErr, setResErr] = useState(null);

  const formik = useFormik({
    initialValues: { username: '', password: '', confirmPassword: '' },
    validationSchema: yup.object().shape({
      username: yup
        .string()
        .required(t('validation.required'))
        .min(3, t('validation.nameLength'))
        .max(20, t('validation.nameLength')),
      password: yup
        .string()
        .min(6, t('validation.passwordLength'))
        .required(t('validation.required')),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], t('validation.confirmPsw'))
        .required(t('validation.required')),
    }),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      try {
        const res = await axios.post(routes.signUpPath(), values);
        localStorage.setItem('userData', JSON.stringify(res.data));
        logIn(res.data);
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 401) {
          return;
        }
        if (err.isAxiosError && err.response.status === 409) {
          setResErr(t('validation.existLogin'));
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
          <Card className="shadow">
            <Card.Body>
              <Form onSubmit={formik.handleSubmit}>
                <h2 className="text-center">{t('registration')}</h2>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="nameInput">{t('username')}</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    className="form-control"
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    isInvalid={resErr || (formik.errors.username && formik.touched.username)}
                    onChange={formik.handleChange}
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    className="invalid-feedback"
                  >
                    { resErr }
                    { formik.errors.username }
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>{t('password')}</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    className="form-control"
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    isInvalid={formik.errors.password && formik.touched.password}
                    onChange={formik.handleChange}
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    className="invalid-feedback"
                  >
                    { formik.errors.password }
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>{t('confirmPsw')}</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                    isInvalid={formik.errors.confirmPassword && formik.touched.confirmPassword}
                    onChange={formik.handleChange}
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    className="invalid-feedback"
                  >
                    { formik.errors.confirmPassword }
                  </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" disabled={formik.isSubmitting}>{t('signUp')}</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;

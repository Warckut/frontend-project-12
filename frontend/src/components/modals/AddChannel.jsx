import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import filter from 'leo-profanity';

import { selectors as channelsSelectors } from '../../slices/channelsSlice';

const AddChannel = ({ action, show, handleClose }) => {
  const channels = useSelector(channelsSelectors.selectAll);
  const namesChannels = channels.map(({ name }) => name);
  filter.loadDictionary('ru');

  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: yup.object().shape({
      name: yup
        .string()
        .required(t('validation.required'))
        .notOneOf(namesChannels, t('validation.unicue')),
    }),
    onSubmit: ({ name }) => action(filter.clean(name)),
  });

  const handleCloseAndReset = () => {
    formik.resetForm();
    handleClose();
  };

  return (
    <Modal centered show={show} onHide={handleCloseAndReset}>
      <Modal.Header closeButton>
        <Modal.Title>{t('titles.addChannel')}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={formik.handleSubmit} className="m-2">
        <Form.Control
          type="text"
          name="name"
          value={formik.values.channel}
          isInvalid={formik.errors.name && formik.touched.name}
          className="form-control"
          onChange={formik.handleChange}
          required
        />
        <Form.Control.Feedback
          type="invalid"
          className="invalid-feedback"
        >
          { formik.errors.name }
        </Form.Control.Feedback>
        <div className="d-flex justify-content-end">
          <Button className="m-2" variant="secondary" onClick={handleCloseAndReset}>
            {t('buttons.cancel')}
          </Button>
          <Button className="m-2" type="submit" variant="primary">
            {t('buttons.addChannel')}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddChannel;

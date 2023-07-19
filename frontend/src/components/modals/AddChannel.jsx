import React, { useEffect, useRef } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { actions as modalsActions } from '../../slices/modalSlice';
import {
  actions as channelsActions,
  selectors as channelsSelectors,
} from '../../slices/channelsSlice';
import { useChat } from '../../hooks';

const AddChannel = ({ onHide }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);
  const namesChannels = channels.map(({ name }) => name);
  const nameInput = useRef(null);

  const { newChannel } = useChat();

  useEffect(() => {
    nameInput.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: yup.object().shape({
      name: yup
        .string()
        .required(t('validation.required'))
        .notOneOf(namesChannels, t('validation.unicue'))
        .min(3, t('validation.nameLength'))
        .max(20, t('validation.nameLength')),
    }),
    onSubmit: ({ name }) => {
      newChannel(name)
        .then((id) => {
          dispatch(channelsActions.setActualChannel(id));
          toast.success(t('toast.createdChannel'));
          dispatch(modalsActions.setCurrentModal(null));
        }).catch(() => toast.error(t('toast.dataLoadingError')));
    },
  });

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('titles.addChannel')}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={formik.handleSubmit} className="m-2">
        <Form.Control
          type="text"
          name="name"
          id="name"
          ref={nameInput}
          value={formik.values.channel}
          isInvalid={formik.errors.name && formik.touched.name}
          className="form-control"
          onChange={formik.handleChange}
          required
        />
        <Form.Label className="visually-hidden" for="name">Имя канала</Form.Label>
        <Form.Control.Feedback
          type="invalid"
          className="invalid-feedback"
        >
          { formik.errors.name }
        </Form.Control.Feedback>
        <div className="d-flex justify-content-end">
          <Button className="m-2" variant="secondary" onClick={onHide}>
            {t('buttons.cancel')}
          </Button>
          <Button className="m-2" type="submit" variant="primary">
            {t('buttons.addChannel')}
          </Button>
        </div>
      </Form>
    </>
  );
};

export default AddChannel;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { selectors as channelsSelectors } from '../../slices/channelsSlice';
import { actions as modalsActions } from '../../slices/modalSlice';
import { useChat } from '../../hooks';

const RenameChannel = ({ onHide }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { renameChannel } = useChat();
  const channels = useSelector(channelsSelectors.selectAll);
  const namesChannels = channels.map(({ name }) => name);
  const id = useSelector((s) => s.modals.channelId);

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
    onSubmit: ({ name }) => {
      renameChannel({ id, name })
        .then(() => {
          toast.success(t('toast.renamedChannel'));
          dispatch(modalsActions.setCurrentModal(null));
        }).catch(() => toast.error(t('toast.dataLoadingError')));
    },
  });

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('titles.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={formik.handleSubmit} className="m-2">
        <Form.Control
          type="text"
          name="name"
          id="name"
          value={formik.values.name}
          className="form-control"
          isInvalid={formik.errors.name && formik.touched.name}
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
            {t('buttons.rename')}
          </Button>
        </div>
      </Form>
    </>
  );
};

export default RenameChannel;

import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Form, InputGroup } from 'react-bootstrap';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { BsArrowRightSquare } from 'react-icons/bs';
import filter from 'leo-profanity';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useChat, useAuth } from '../hooks';
import { selectors as channelsSelectors } from '../slices/channelsSlice';

const ChatForm = () => {
  const { t } = useTranslation();
  const channelId = useSelector(channelsSelectors.currentChannelId);
  const { user } = useAuth();
  const { sendMessage } = useChat();

  const formik = useFormik({
    initialValues: { text: '' },
    validationSchema: yup.object().shape({
      text: yup.string().required(),
    }),
    onSubmit: ({ text }, helpers) => {
      sendMessage({
        body: filter.clean(text),
        channelId,
        username: user.username,
      }).catch(() => toast.error(t('toast.dataLoadingError')))
        .finally(() => helpers.resetForm());
    },
  });

  return (
    <div className="mt-auto px-5 py-3">
      <Form className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
        <InputGroup className="has-validation">
          <Form.Control
            type="text"
            name="text"
            aria-label="Новое сообщение"
            autoComplete="off"
            placeholder="Введите сообщение..."
            className="border-0 p-0 ps-2 form-control"
            value={formik.values.text}
            onChange={formik.handleChange}
          />
          <Button
            type="submit"
            className="text-primary border-0"
            variant="group-vertical"
            disabled={!formik.values.text || formik.isSubmitting}
          >
            <BsArrowRightSquare size="20" color={formik.values.text ? 'black' : 'gray'} />
            <span className="visually-hidden">Отправить</span>
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default ChatForm;

import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { useChat } from '../../hooks';
import { actions as modalsActions } from '../../slices/modalSlice';

const RemoveChannel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { removeChannel } = useChat();
  const id = useSelector((s) => s.modals.channelId);

  const remove = () => {
    removeChannel(id)
      .then(() => {
        toast.success(t('toast.removedChannel'));
        dispatch(modalsActions.setCurrentModal(null));
      }).catch(() => toast.error(t('toast.dataLoadingError')));
  };

  return (
    <Modal
      centered
      show
      onHide={() => dispatch(modalsActions.setCurrentChannel(null))}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('titles.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {t('areYouSure')}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary">
          {t('buttons.cancel')}
        </Button>
        <Button variant="danger" onClick={remove}>{t('buttons.remove')}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannel;

import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const RemoveChannel = ({ show, action, handleClose }) => {
  const { t } = useTranslation();
  return (
    <Modal
      centered
      show={show}
      onHide={handleClose}
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
        <Button variant="danger" onClick={action}>{t('buttons.remove')}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannel;

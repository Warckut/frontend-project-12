import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';

import { actions as modalsActions } from '../../slices/modalSlice';
import AddChannel from './AddChannel';
import RenameChannel from './RenameChannel';
import RemoveChannel from './RemoveChannel';

const typesModals = {
  addChannel: AddChannel,
  renameChannel: RenameChannel,
  removeChannel: RemoveChannel,
};

const ModalComponent = () => {
  const dispatch = useDispatch();
  const modalType = useSelector(({ modals }) => modals.modalType);
  if (!modalType) {
    return null;
  }
  const Component = typesModals[modalType];

  const handleCloseAndReset = () => {
    dispatch(modalsActions.setCurrentModal(null));
  };

  return (
    <Modal centered show onHide={handleCloseAndReset}>
      <Component onHide={handleCloseAndReset} />
    </Modal>
  );
};

export default ModalComponent;

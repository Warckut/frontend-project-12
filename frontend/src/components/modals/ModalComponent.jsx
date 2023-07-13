import React from 'react';
import { useSelector } from 'react-redux';

import AddChannel from './AddChannel';
import RenameChannel from './RenameChannel';
import RemoveChannel from './RemoveChannel';

const getModal = (name) => ({
  addChannel: AddChannel,
  renameChannel: RenameChannel,
  removeChannel: RemoveChannel,
}[name]);

const ModalComponent = () => {
  const modalType = useSelector(({ modals }) => modals.modalType);
  if (!modalType) {
    return null;
  }
  const Component = getModal(modalType);
  return <Component />;
};

export default ModalComponent;

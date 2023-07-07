import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import {
  Nav,
  Button,
  Dropdown,
  ButtonGroup,
} from 'react-bootstrap';

import socket from '../../socket';
import RenameChannel from '../modals/RenameChannel';
import { actions as channelsActions } from '../../slices/channelsSlice';
import RemoveChannel from '../modals/RemoveChannel';

const ChannelItem = ({
  channelData,
  variant,
}) => {
  const { t } = useTranslation();
  const [showRnMd, setShowRnMd] = useState(false);
  const [showRmMd, setShowRmMd] = useState(false);
  const { id, name, removable } = channelData;
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(channelsActions.setActualChannel(id));
  };

  const closeRnMd = () => setShowRnMd(false);

  const closeRmMd = () => setShowRmMd(false);

  const renameChannel = (newname) => {
    console.log(newname);
    socket.emit('renameChannel', { id, name: newname }, (response) => {
      if (response.error) {
        toast.error(t('toast.dataLoadingError'));
      } else {
        toast.success(t('toast.renamedChannel'));
        setShowRnMd(false);
      }
    });
  };

  const removeChannel = () => {
    socket.emit('removeChannel', { id }, (response) => {
      if (response.error) {
        toast.error(t('toast.dataLoadingError'));
      } else {
        toast.success(t('toast.removedChannel'));
        setShowRmMd(false);
      }
    });
  };

  return (
    <>
      <Nav.Item as="li" className="w-100 d-flex">
        <Dropdown className="w-100" as={ButtonGroup}>
          <Button onClick={handleClick} className="w-100 rounded-0 text-truncate text-start" variant={variant}>
            <span className="me-1">#</span>
            {name}
          </Button>

          { removable && (
            <Dropdown.Toggle split variant={variant} id="dropdown-basic" />
          )}

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setShowRnMd(true)}>
              {t('buttons.rename')}
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setShowRmMd(true)} href="#/action-2">
              {t('buttons.remove')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav.Item>
      <RenameChannel
        show={showRnMd}
        action={renameChannel}
        handleClose={closeRnMd}
      />
      <RemoveChannel
        show={showRmMd}
        action={removeChannel}
        handleClose={closeRmMd}
      />
    </>
  );
};

export default ChannelItem;

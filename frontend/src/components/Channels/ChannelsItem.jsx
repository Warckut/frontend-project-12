import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Nav,
  Button,
  Dropdown,
  ButtonGroup,
} from 'react-bootstrap';

import { actions as modalsActions } from '../../slices/modalSlice';
import { actions as channelsActions } from '../../slices/channelsSlice';

const ChannelItem = ({
  channelData,
  variant,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { id, name, removable } = channelData;

  const handleClick = () => {
    dispatch(channelsActions.setActualChannel(id));
  };

  return (
    <Nav.Item as="li" className="w-100 d-flex">
      <Dropdown className="w-100" as={ButtonGroup}>
        <Button
          onClick={handleClick}
          className="w-100 rounded-0 text-truncate text-start"
          variant={variant}
        >
          <span className="me-1">#</span>
          {name}
        </Button>

        { removable && (
          <Dropdown.Toggle split variant={variant} id="dropdown-basic">
            <span className="visually-hidden">Управление каналом</span>
          </Dropdown.Toggle>
        )}

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => {
            dispatch(modalsActions.setCurrentModal('renameChannel'));
            dispatch(modalsActions.setCurrentChannel(id));
          }}
          >
            {t('buttons.rename')}
          </Dropdown.Item>
          <Dropdown.Item onClick={() => {
            dispatch(modalsActions.setCurrentModal('removeChannel'));
            dispatch(modalsActions.setCurrentChannel(id));
          }}
          >
            {t('buttons.remove')}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav.Item>
  );
};

export default ChannelItem;

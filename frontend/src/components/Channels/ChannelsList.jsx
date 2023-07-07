import React, { useState, useEffect } from 'react';
import { BsPlusSquare } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Nav, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import socket from '../../socket';
import ChannelItem from './ChannelsItem';
import AddChannel from '../modals/AddChannel';
import {
  selectors as channelsSelectors,
  actions as channelsActions,
} from '../../slices/channelsSlice';

const ChannelList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannelId = useSelector((s) => s.channelsInfo.currentChannelId);

  useEffect(() => {
    socket.on('newChannel', (payload) => {
      dispatch(channelsActions.addChannel(payload));
    });
    socket.on('renameChannel', (payload) => {
      dispatch(channelsActions.renameChannel(payload));
    });
    socket.on('removeChannel', (payload) => {
      dispatch(channelsActions.removeChannel(payload));
    });
  });

  const openModal = () => setShow(true);

  const closeModal = () => setShow(false);

  const addChannel = (name) => {
    socket.emit('newChannel', { name }, (response) => {
      if (response.error) {
        toast.error(t('toast.dataLoadingError'));
      } else {
        toast.success(t('toast.createdChannel'));
      }
    });
    setShow(false);
  };

  return (
    <>
      <Col className="col-4 px-0 bg-light d-flex flex-column h-100 border-end" md="2">
        <div className="d-flex justify-content-between ps-4 pe-2 p-4">
          <b>Каналы</b>
          <Button onClick={openModal} variant="group-vertical" className="p-0 text-primary">
            <BsPlusSquare size="20" />
            <span className="visually-hidden">+</span>
          </Button>
        </div>
        <Nav className="me-auto flex-column nav-pills nav-fill px-2 mb-3 overflow-auto w-100 h-100 d-block" as="ul">
          {channels.map((channel) => (
            <ChannelItem
              key={channel.id}
              channelData={channel}
              variant={channel.id === currentChannelId ? 'secondary' : 'light'}
            />
          ))}
        </Nav>
      </Col>
      <AddChannel
        action={addChannel}
        show={show}
        handleClose={closeModal}
      />
    </>
  );
};

export default ChannelList;

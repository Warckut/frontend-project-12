import React from 'react';
import { BsPlusSquare } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Nav, Col } from 'react-bootstrap';

import ChannelItem from './ChannelsItem';
import { selectors as channelsSelectors } from '../../slices/channelsSlice';
import { actions as modalsActions } from '../../slices/modalSlice';

const ChannelList = () => {
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannelId = useSelector(channelsSelectors.currentChannelId);

  return (
    <Col className="col-4 px-0 bg-light d-flex flex-column h-100 border-end" md="2">
      <div className="d-flex justify-content-between ps-4 pe-2 p-4">
        <b>Каналы</b>
        <Button
          onClick={() => dispatch(modalsActions.setCurrentModal('addChannel'))}
          variant="group-vertical"
          className="p-0 text-primary"
        >
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
  );
};

export default ChannelList;

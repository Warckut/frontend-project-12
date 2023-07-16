import React, { useEffect } from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { range } from 'lodash';

import ChannelList from '../Channels/ChannelsList';
import ChatBox from '../ChatBox';
import ChatForm from '../ChatForm';

import fetchUserData from '../../slices/fetchUserData';
import { selectors as messagesSelectors } from '../../slices/messagesSlice';
import { selectors as channelsSelectors } from '../../slices/channelsSlice';
import ModalComponent from '../modals/ModalComponent';
import { useAuth } from '../../hooks';

const Chat = () => {
  const { t } = useTranslation();
  const { logOut } = useAuth();
  const dispatch = useDispatch();
  const messages = useSelector(messagesSelectors.selectAll);
  const currentChannelId = useSelector((s) => s.channelsInfo.currentChannelId);
  const currentChannel = useSelector((s) => channelsSelectors.selectById(s, currentChannelId));
  const loaderStatus = useSelector((s) => s.loader.status);

  const currentCountMessages = messages
    .reduce((total, { channelId }) => (channelId === currentChannelId ? total + 1 : total), 0);

  useEffect(() => {
    dispatch(fetchUserData());
  }, []);

  useEffect(() => {
    if (loaderStatus === 'ERROR') {
      logOut();
    }
  }, [loaderStatus]);

  const getCorrectWord = (number) => {
    if (range(5, 21).includes(number)) return t('messagesPlural');
    if (range(2, 5).includes(number % 10)) return t('messagesPluralAccusative');
    if (number % 10 === 1) return t('messagesSingular');
    return t('messagesPlural');
  };

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="bg-white flex-md-row h-100">
        <ChannelList />
        <Col className="p-0 d-flex flex-column h-100">
          <div className="mb-4 bg-light p-3 shadow-sm small w-100">
            <p className="m-0">
              <b>
                <span className="me-1">#</span>
                {currentChannel?.name || null}
              </b>
            </p>
            <span className="text-muted">
              {currentCountMessages || 0}
              {' '}
              {getCorrectWord(currentCountMessages)}
            </span>
          </div>
          <ChatBox />
          <ChatForm />
        </Col>
      </Row>
      <ModalComponent />
    </Container>
  );
};

export default Chat;

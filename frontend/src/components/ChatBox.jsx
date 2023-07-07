import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import socket from '../socket';
import {
  actions as messagesActions,
  selectors as messagesSelectors,
} from '../slices/messagesSlice';

const ChatBox = () => {
  const dispatch = useDispatch();
  const messages = useSelector(messagesSelectors.selectAll);
  const currentChannelId = useSelector((s) => s.channelsInfo.currentChannelId);
  const currMessages = messages.filter(({ channelId }) => channelId === currentChannelId);

  useEffect(() => {
    socket.on('newMessage', (payload) => {
      dispatch(messagesActions.addMessage(payload));
    });
  });

  const messagesView = useRef(null);

  useEffect(() => {
    messagesView.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
  }, [currMessages]);

  return (
    <div ref={messagesView} className="chat-messages overflow-auto px-5">
      {currMessages
        .map((message) => (
          <div key={message.id} className="text-break mb-2">
            <b>{message.username}</b>
            {': '}
            {message.body}
          </div>
        ))}
    </div>
  );
};

export default ChatBox;

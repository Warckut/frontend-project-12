import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import {
  selectors as messagesSelectors,
} from '../slices/messagesSlice';

const ChatBox = () => {
  const currMessages = useSelector(messagesSelectors.currentMessages);
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

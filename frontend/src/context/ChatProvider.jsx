import React from 'react';
import { ChatContext } from '.';
import chatApi from './chatApi';

const ChatProvider = ({ children }) => (
  <ChatContext.Provider value={chatApi}>
    {children}
  </ChatContext.Provider>
);

export default ChatProvider;

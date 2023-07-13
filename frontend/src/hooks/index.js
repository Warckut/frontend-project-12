import { useContext } from 'react';

import { AuthContext, ChatContext } from '../context';

const useAuth = () => useContext(AuthContext);
const useChat = () => useContext(ChatContext);

export { useAuth, useChat };

import { configureStore } from '@reduxjs/toolkit';
import channelsReducer, { actions as channelActions } from './channelsSlice';
import messagesReducer, { actions as messagesActions } from './messagesSlice';
import modalsReducer, { actions as modalsActions } from './modalSlice';

export default configureStore({
  reducer: {
    channelsInfo: channelsReducer,
    messagesInfo: messagesReducer,
    modals: modalsReducer,
  },
});

export const actions = {
  ...channelActions,
  ...messagesActions,
  ...modalsActions,
};

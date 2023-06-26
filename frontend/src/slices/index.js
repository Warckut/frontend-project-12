/* eslint-disable import/no-extraneous-dependencies */
import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice';
import messagesReducer from './messagesSlice';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
  },
});

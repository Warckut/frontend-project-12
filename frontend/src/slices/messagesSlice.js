import { createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit';

import fetchUserData from './fetchUserData';
import { actions as channelsActions } from './channelsSlice';

const messagesAdapter = createEntityAdapter();

const messagesSlice = createSlice({
  name: 'messagesInfo',
  initialState: {
    messages: messagesAdapter.getInitialState({}),
  },
  reducers: {
    addMessage(state, { payload }) {
      messagesAdapter.addOne(state.messages, payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.fulfilled, (state, action) => {
        const { messages } = action.payload;
        messagesAdapter.setAll(state.messages, messages);
      })
      .addCase(channelsActions.removeChannel, (state, action) => {
        const rmdChannelId = action.payload.id;
        const idsRm = Object
          .values(state.messages.entities)
          .filter(({ channelId }) => channelId === rmdChannelId)
          .map(({ id }) => id);
        messagesAdapter.removeMany(state.messages, idsRm);
      });
  },
});

export const selectors = {
  ...messagesAdapter.getSelectors((state) => state.messagesInfo.messages),
  currentMessages: createSelector(
    (state) => state,
    ({ channelsInfo, messagesInfo }) => {
      const { currentChannelId } = channelsInfo;
      const { messages } = messagesInfo;
      return Object
        .values(messages.entities)
        .filter(({ channelId }) => channelId === currentChannelId);
    },
  ),
};

export const { actions } = messagesSlice;
export default messagesSlice.reducer;

import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import { fetchUserData, actions as channelsActions } from './channelsSlice';

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
      .addCase(fetchUserData.rejected, () => {
        console.log('error');
      })
      .addCase(channelsActions.removeChannel, (state, action) => {
        const rmdChannelId = action.payload.id;
        const idsRm = Object
          .values(state.messages.entities)
          .filter(({ channelId }) => channelId === rmdChannelId)
          .map(({ id }) => id);
        console.log(idsRm);
        messagesAdapter.removeMany(state.messages, idsRm);
      });
  },
});

export const selectors = messagesAdapter.getSelectors((state) => state.messagesInfo.messages);
export const { actions } = messagesSlice;
export default messagesSlice.reducer;

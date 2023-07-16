/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit';

import fetchUserData from './fetchUserData';

const channelsAdapter = createEntityAdapter();

const defaultCurrentChannel = 1;

const channelsSlice = createSlice({
  name: 'channelsInfo',
  initialState: {
    channels: channelsAdapter.getInitialState({}),
    currentChannelId: defaultCurrentChannel,
  },
  reducers: {
    setActualChannel(state, { payload }) {
      state.currentChannelId = payload;
    },
    addChannel(state, { payload }) {
      channelsAdapter.addOne(state.channels, payload);
    },
    renameChannel(state, { payload }) {
      channelsAdapter.updateOne(state.channels, {
        id: payload.id,
        changes: { name: payload.name },
      });
    },
    removeChannel(state, { payload }) {
      if (state.currentChannelId === payload.id) {
        state.currentChannelId = defaultCurrentChannel;
      }
      channelsAdapter.removeOne(state.channels, payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.fulfilled, (state, action) => {
        const { channels, currentChannelId } = action.payload;
        channelsAdapter.setAll(state.channels, channels);
        state.currentChannelId = currentChannelId;
      });
  },
});

export const { actions } = channelsSlice;
export const selectors = {
  ...channelsAdapter.getSelectors((state) => state.channelsInfo.channels),
  currentChannelId: createSelector(
    (state) => state.channelsInfo.currentChannelId,
    (currentChannelId) => currentChannelId,
  ),
};
export default channelsSlice.reducer;

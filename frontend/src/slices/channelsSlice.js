import axios from 'axios';
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../routes';

const channelsAdapter = createEntityAdapter();

export const fetchUserData = createAsyncThunk(
  'channels/fetchChannels',
  async () => {
    const { token } = JSON.parse(localStorage.getItem('userData'));
    const response = await axios.get(routes.usersPath(), {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
);

const channelsSlice = createSlice({
  name: 'channelsInfo',
  initialState: {
    channels: channelsAdapter.getInitialState({}),
    currentChannelId: 1,
  },
  reducers: {
    setActualChannel(state, { payload }) {
      state.currentChannelId = payload;
    },
    addChannel(state, { payload }) {
      channelsAdapter.addOne(state.channels, payload);
      state.currentChannelId = payload.id;
    },
    renameChannel(state, { payload }) {
      channelsAdapter.updateOne(state.channels, {
        id: payload.id,
        changes: { name: payload.name },
      });
    },
    removeChannel(state, { payload }) {
      if (state.currentChannelId === payload.id) {
        state.currentChannelId = 1;
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
      })
      .addCase(fetchUserData.rejected, () => {
        console.log('error');
      });
  },
});

export const { actions } = channelsSlice;
export const selectors = channelsAdapter.getSelectors((state) => state.channelsInfo.channels);
export default channelsSlice.reducer;

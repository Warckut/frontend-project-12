/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../routes';

const channelsAdapter = createEntityAdapter();

export const fetchUserData = createAsyncThunk(
  'channels/fetchChannels',
  async ({ headers }) => {
    const response = await axios.get(routes.usersPath(), {
      headers,
    });
    console.log(response);
    return response.data;
  },
);

const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState({}),
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.fulfilled, (state, action) => {
        const { channels } = action.payload;
        channelsAdapter.setAll(state, channels);
      })
      .addCase(fetchUserData.rejected, () => {
        console.log('error');
      });
  },
});

export const { actions } = channelsSlice;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;

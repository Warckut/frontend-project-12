/* eslint-disable import/no-extraneous-dependencies */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchUserData } from './channelsSlice';

const messagesAdapter = createEntityAdapter();

const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState({}),
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.fulfilled, (state, action) => {
        const { messages } = action.payload;
        messagesAdapter.setAll(state, messages);
      })
      .addCase(fetchUserData.rejected, () => {
        console.log('error');
      });
  },
});

// export const { actions } = messagesSlice;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;

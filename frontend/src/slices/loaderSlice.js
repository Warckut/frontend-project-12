/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import fetchUserData from './fetchUserData';

const loaderSlice = createSlice({
  name: 'loader',
  initialState: {
    status: 'IDLE',
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.fulfilled, (state) => {
        state.status = 'LOADED';
      })
      .addCase(fetchUserData.rejected, (state) => {
        state.status = 'ERROR';
      });
  },
});

export default loaderSlice.reducer;

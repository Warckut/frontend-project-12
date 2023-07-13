/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modals',
  initialState: {
    modalType: null,
    channelId: null,
  },
  reducers: {
    setCurrentModal(state, { payload }) {
      state.modalType = payload;
    },
    setCurrentChannel(state, { payload }) {
      state.channelId = payload;
    },
  },
});

export const { actions } = modalSlice;
export default modalSlice.reducer;

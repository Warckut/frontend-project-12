import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import routes from '../routes';
import { getUserData } from '../context/authApi';

const fetchUserData = createAsyncThunk(
  'channels/fetchChannels',
  async () => {
    const { token } = getUserData();
    const response = await axios.get(routes.usersPath(), {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
);

export default fetchUserData;

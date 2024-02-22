import { collection } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { recordCollection } from '../Record/record.slice';

const initialState = {
  playlists: [],
  isLoading: true,
};
const playlistRef = collection(db, 'playlists');

export const getPlaylists = createAsyncThunk('playlists/getAll', async () => {});

export const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(getPlaylists.pending, state => {
        state.isLoading = true;
      })
      .addCase(getPlaylists.fulfilled, (state, action) => {
        state.isLoading = false;
      }),
});

export default playlistSlice.reducer;

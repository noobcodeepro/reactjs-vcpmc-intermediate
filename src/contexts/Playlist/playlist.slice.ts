import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { recordCollection } from '../Record/record.slice';
import { Record } from '../../types/record.type';

export interface Playlist {
  id: string;
  title: string;
  count: number;
  duration: number;
  description?: string;
  topics?: Array<string>;
  songs: Array<string>;
  createAt: number;
  createBy: string;
}

export interface IPlaylist {
  playlists: Array<Playlist>;
  waitingPlaylist: Playlist;
}

const initialState: IPlaylist = {
  playlists: [],
  waitingPlaylist: {
    id: '',
    title: '',
    count: 0,
    duration: 0,
    description: '',
    topics: [''],
    songs: [],
    createAt: new Date().getTime(),
    createBy: '',
  },
};
const playlistRef = collection(db, 'playlists');

export const getPlaylists = createAsyncThunk('playlists/getAll', async () => {
  const data = await getDocs(playlistRef);

  const filteredData = data.docs.map(doc => ({ ...doc.data(), id: doc.id }) as Playlist);

  return filteredData;
});

export const addPlaylist = createAsyncThunk('playlists/add', async (item: Omit<Playlist, 'id'>) => {
  const data = await addDoc(playlistRef, item);
  return {
    ...item,
    id: data.id,
  } as Playlist;
});

export const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    addRecordToPlaylist: (state, action: PayloadAction<Record>) => {
      if (!state.waitingPlaylist.songs.includes(action.payload.id)) {
        state.waitingPlaylist.songs.push(action.payload.id);
        const prevCount = state.waitingPlaylist.count;
        state.waitingPlaylist.count = prevCount + 1;
        state.waitingPlaylist.duration += action.payload.duration;
      }
    },
    deleteAddedRecord: (state, action: PayloadAction<Record>) => {
      const prevData = state.waitingPlaylist.songs;
      const filterData = prevData.filter(p => p !== action.payload.id);
      state.waitingPlaylist.songs = filterData;
      const prevCount = state.waitingPlaylist.count;
      state.waitingPlaylist.count = prevCount - 1;
      state.waitingPlaylist.duration -= action.payload.duration;
    },
    clearWaiting: state => {
      state.waitingPlaylist = initialState.waitingPlaylist;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(getPlaylists.pending, state => {})
      .addCase(getPlaylists.fulfilled, (state, action) => {
        state.playlists = action.payload;
      })
      .addCase(addPlaylist.fulfilled, state => {
        state.waitingPlaylist = initialState.waitingPlaylist;
      }),
});

export const { addRecordToPlaylist, deleteAddedRecord, clearWaiting } = playlistSlice.actions;

export default playlistSlice.reducer;

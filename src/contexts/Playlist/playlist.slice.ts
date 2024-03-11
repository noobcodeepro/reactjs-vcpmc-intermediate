import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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
    topics: [],
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

export const getPlaylist = createAsyncThunk('playlists/get', async (id: string) => {
  const data = await getDoc(doc(db, `/playlists/${id}`));

  return {
    ...data.data(),
    id: data.id,
  } as Playlist;
});

export const addPlaylist = createAsyncThunk('playlists/add', async (item: Omit<Playlist, 'id'>) => {
  const data = await addDoc(playlistRef, item);
  return {
    ...item,
    id: data.id,
  } as Playlist;
});

export const updatePlaylist = createAsyncThunk(
  'playlists/update',
  async ({ item, id }: { item: Omit<Playlist, 'id'>; id: string }) => {
    const docRef = doc(db, `/playlists/${id}`);

    await updateDoc(docRef, item);

    return {
      ...item,
      id: docRef.id,
    };
  },
);

export const deletePlaylist = createAsyncThunk('playlists/delete', async (id: string) => {
  const docRef = doc(db, `/playlists/${id}`);
  await deleteDoc(docRef);
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
    startEdit: (state, action: PayloadAction<Playlist>) => {
      state.waitingPlaylist = action.payload;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(getPlaylists.pending, () => {})
      .addCase(getPlaylists.fulfilled, (state, action) => {
        state.playlists = action.payload;
      })
      .addCase(addPlaylist.fulfilled, state => {
        state.waitingPlaylist = initialState.waitingPlaylist;
      }),
});

export const { addRecordToPlaylist, deleteAddedRecord, clearWaiting, startEdit } =
  playlistSlice.actions;

export default playlistSlice.reducer;

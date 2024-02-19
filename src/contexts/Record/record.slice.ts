import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Record } from '../../types/record.type';
import { db, storage } from '../../lib/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';

interface IState {
  records: Array<Record>;
  isLoading: boolean;
}

const initialState: IState = {
  records: [],
  isLoading: true,
};

export const recordCollection = collection(db, 'records');

export const getRecords = createAsyncThunk<Record[]>('records/getAll', async () => {
  const querySnapshot = await getDocs(query(recordCollection, orderBy('expireDate', 'desc')));

  const recordsWithUrls = await Promise.all(
    querySnapshot.docs.map(async doc => {
      const fileRef = ref(storage, 'records/' + doc.id + '.jpg');
      const photoUrl = await getDownloadURL(fileRef);

      return {
        ...(doc.data() as Omit<Record, 'id'>),
        id: doc.id,
        photoUrl,
      };
    }),
  );
  return recordsWithUrls;
});

export const recordSlice = createSlice({
  name: 'record',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(getRecords.pending, state => {
        state.isLoading = true;
      })
      .addCase(getRecords.fulfilled, (state, action) => {
        state.records = action.payload;
        state.isLoading = false;
      }),
});

// Action creators are generated for each case reducer function

export default recordSlice.reducer;

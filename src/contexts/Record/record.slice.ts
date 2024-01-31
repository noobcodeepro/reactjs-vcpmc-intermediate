import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Record } from '../../types/record.type';
import { db } from '../../lib/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

interface IState {
  records: Array<Record>;
  isLoading: boolean;
}

const initialState: IState = {
  records: [],
  isLoading: true,
};

const recordCollection = collection(db, 'records');

export const getRecords = createAsyncThunk<Record[]>('records/getAll', async () => {
  const querySnapshot = await getDocs(query(recordCollection, orderBy('expireDate', 'desc')));

  return querySnapshot.docs.map(doc => {
    return {
      ...(doc.data() as Omit<Record, 'id'>),
      id: doc.id,
    };
  });
});

export const recordSlice = createSlice({
  name: 'counter',
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

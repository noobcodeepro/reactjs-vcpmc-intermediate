import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Record } from '../../types/record.type';
import { db, storage } from '../../lib/firebase';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { contractCollection } from '../Manage/Contract/Authorize.slice';
import React from 'react';

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
    querySnapshot.docs.map(async d => {
      let photoUrl = '';
      try {
        const fileRef = ref(storage, 'records/' + d.id + '.jpg');
        if (fileRef) {
          photoUrl = (await getDownloadURL(fileRef)) || '';
        }
      } catch (error) {
        console.log(error);
      }
      const contractRef = doc(db, `/authorizedContracts/${d.data().contractId}`);
      const data = (await getDoc(contractRef)).data();

      return {
        ...(d.data() as Omit<Record, 'id'>),
        id: d.id,
        expireDate: data?.endDate,
        authorizationDate: data?.startDate,
        photoUrl,
      };
    }),
  );
  return recordsWithUrls;
});

export const approveRecord = createAsyncThunk(
  'records/approved',
  async (idList: Array<React.Key>) => {
    console.log(idList);

    const approveRecordList = await Promise.all(
      idList.map(async id => {
        const docRef = doc(db, `/records/${id}`);
        const data = (await getDoc(docRef)).data() as Record;
        await updateDoc(docRef, {
          ...data,
          approvedAt: new Date().getTime(),
        });

        console.log({
          ...data,
          id: docRef.id,
          approvedAt: new Date().getTime(),
        });

        return {
          ...data,
          id: data?.id,
          approvedAt: new Date().getTime(),
        } as Record;
      }),
    );

    return approveRecordList;
  },
);

export const getDetailRecord = createAsyncThunk('records/getRecord', async (id: string) => {
  const data = (await getDoc(doc(db, `/records/${id}`))).data() as Record;
  const contractData = (await getDoc(doc(db, `/authorizedContracts/${data.id}`))).data();
  return {
    data,
    contractData,
  };
});

export const addRecord = createAsyncThunk('records/addRecord', async (item: Omit<Record, 'id'>) => {
  try {
    console.log(item);

    const docRef = await addDoc(recordCollection, item);
    return { id: docRef.id, ...item };
  } catch (error) {
    console.log(error);
  }
});

export const denyApproveRecord = createAsyncThunk(
  'records/denyApprove',
  async ({ idList, denyReason }: { idList: Array<React.Key>; denyReason: string }) => {
    const denyRecords = await Promise.all(
      idList.map(async id => {
        const docRef = doc(db, `/records/${id}`);
        const data = (await getDoc(docRef)).data() as Record;
        await updateDoc(docRef, {
          ...data,
          denyReason,
        });
        return {
          ...data,
          id: docRef.id,
          denyReason,
        };
      }),
    );

    return denyRecords;
  },
);

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

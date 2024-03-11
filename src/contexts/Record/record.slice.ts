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
import { IAuthorizeContract } from '../Manage/Contract/Authorize.slice';
import React from 'react';

interface IState {
  records: Array<Record>;
  edittingRecord: Record | null;
  isLoading: boolean;
}

const initialState: IState = {
  records: [],
  edittingRecord: null,
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
        photoUrl = '';
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
    const currentTime = new Date().getTime();
    await Promise.all(
      idList.map(async id => {
        const docRef = doc(db, `/records/${id}`);
        const data = (await getDoc(docRef)).data() as Record;
        await updateDoc(docRef, {
          ...data,
          approvedAt: currentTime,
        });

        return {
          ...data,
          id: data?.id,
          approvedAt: currentTime,
        } as Record;
      }),
    );

    return { idList, currentTime };
  },
);

export const getDetailRecord = createAsyncThunk('records/getRecord', async (id: string) => {
  const data = (await getDoc(doc(db, `/records/${id}`))).data() as Record;
  const contractData = await getDoc(doc(db, `/authorizedContracts/${data.id}`));
  let photoUrl = '';
  try {
    const fileRef = ref(storage, 'records/' + id + '.jpg');
    if (fileRef) {
      photoUrl = (await getDownloadURL(fileRef)) || '';
    }
  } catch (error) {
    photoUrl = '';
  }
  return {
    data,
    contractData: { ...contractData.data(), id: contractData.id } as IAuthorizeContract,
    photoUrl,
  };
});

export const addRecord = createAsyncThunk('records/addRecord', async (item: Omit<Record, 'id'>) => {
  try {
    const docRef = await addDoc(recordCollection, item);
    return { id: docRef.id, ...item };
  } catch (error) {
    console.log(error);
  }
});

export const updateRecord = createAsyncThunk(
  'records/update',
  async ({
    item,
    id,
  }: {
    item: {
      name: string;
      isrc_id: string;
      singer: string;
      author: string;
      producer?: string;
      category: string;
    };
    id: string;
  }) => {
    const docRef = doc(db, `/records/${id}`);
    await updateDoc(docRef, item);
  },
);

export const denyApproveRecord = createAsyncThunk(
  'records/denyApprove',
  async ({ idList, denyReason }: { idList: Array<React.Key>; denyReason: string }) => {
    await Promise.all(
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

    return { idList, denyReason };
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
      })
      .addCase(approveRecord.fulfilled, (state, action) => {
        const arrayList = action.payload.idList;
        const approvedAt = action.payload.currentTime;
        state.records.map((r, index) => {
          if (arrayList.includes(r.id)) {
            state.records[index] = { ...r, approvedAt };
          }
        });
      })
      .addCase(denyApproveRecord.fulfilled, (state, action) => {
        const arrayList = action.payload.idList;
        const reason = action.payload.denyReason;

        state.records.map((r, index) => {
          if (arrayList.includes(r.id)) {
            state.records[index] = { ...r, denyReason: reason };
          }
        });
      }),
});

// Action creators are generated for each case reducer function

export default recordSlice.reducer;

import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { db } from '../../../lib/firebase';
import { addDoc, collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';

type IUsageState = 'active' | 'in-active';

interface IState {
  usages: Array<IUsage>;
  waitingAuthority: Omit<IUsage, 'id'> | null;
  edittingAuthority: IUsage | null;
  isLoading: boolean;
}

export interface IUsage {
  id: string;
  name: string;
  admin: string;
  contractId: string;
  userCount: string;
  deviceCount: string;
  expireDate: number;
  state: IUsageState;
  authorityIds: string[];
}

const initialState: IState = {
  usages: [],
  waitingAuthority: null,
  edittingAuthority: null,
  isLoading: true,
};

export const usageUnitCollection = collection(db, 'usageUnits');

export const getusageUnit = createAsyncThunk<Array<IUsage>>('usageUnit/getAll', async () => {
  const data = await getDocs(usageUnitCollection);

  const filteredData = data.docs.map(doc => ({ ...doc.data(), id: doc.id }) as IUsage);

  return filteredData;
});

export const getUsageUnitDetail = createAsyncThunk('usageUnit/get', async (id: string) => {
  const docRef = await getDoc(doc(db, `/usageUnits/${id}`));
  return {
    ...docRef.data(),
    id: docRef.id,
  } as IUsage;
});

export const addAuthority = createAsyncThunk('usageUnit/add', async (item: Omit<IUsage, 'id'>) => {
  try {
    const docRef = await addDoc(usageUnitCollection, item);
    return { id: docRef.id, ...item };
  } catch (error) {
    console.log(error);
  }
});

export const updateAuthority = createAsyncThunk(
  'usageUnit/update',
  async ({ item, id }: { item: Omit<IUsage, 'id'>; id: string }) => {
    const docRef = doc(db, `/usageUnits/${id}`);

    await updateDoc(docRef, item);

    return {
      ...item,
      id: docRef.id,
    };
  },
);

export const activeUsage = createAsyncThunk(
  'usageUnit/activeUsage',
  async ({ id }: { id: string }) => {
    const docRef = doc(db, `/usageUnits/${id}`);
    const isBanned = (await getDoc(docRef)).data()?.state === 'ban';
    if (!isBanned) {
      await updateDoc(docRef, { state: 'in-active' });
      return docRef.id;
    }
  },
);

export const deactiveUsage = createAsyncThunk(
  'usageUnit/deactivate',
  async ({ id }: { id: string }) => {
    const docRef = doc(db, `/usageUnits/${id}`);
    const isBanned = (await getDoc(docRef)).data()?.state === 'ban';
    if (!isBanned) {
      await updateDoc(docRef, { state: 'in-active' });
      return docRef.id;
    }
  },
);

export const usageUnitSlice = createSlice({
  name: 'Usage',
  initialState,
  reducers: {
    addWaitingAuthority: (state, action: PayloadAction<Omit<IUsage, 'id'>>) => {
      state.waitingAuthority = action.payload;
    },
    startEditAuthority: (state, action: PayloadAction<IUsage>) => {
      state.isLoading = true;
      state.edittingAuthority = action.payload;
      state.isLoading = false;
    },
    cancelEdAuthority: state => {
      state.edittingAuthority = null;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(getusageUnit.pending, state => {
        state.isLoading = true;
      })
      .addCase(getusageUnit.fulfilled, (state, action) => {
        state.usages = action.payload;
        state.isLoading = false;
      })
      .addCase(addAuthority.fulfilled, state => {
        state.edittingAuthority = null;
      })
      .addCase(updateAuthority.fulfilled, (state, action) => {
        state.edittingAuthority = null;
        state.usages.find((item, index) => {
          if (item.id === action.payload.id) {
            state.usages[index] = action.payload;
            return true;
          }
          return false;
        });
      })
      .addCase(activeUsage.fulfilled, (state, action) => {
        state.edittingAuthority = null;
        state.usages.find((a, index) => {
          if (a.id === action.payload) {
            state.usages[index].state = 'active';
          }
        });
      })
      .addCase(deactiveUsage.fulfilled, (state, action) => {
        state.edittingAuthority = null;
        state.usages.find((a, index) => {
          if (a.id === action.payload) {
            state.usages[index].state = 'in-active';
          }
        });
      }),
});

// Action creators are generated for each case reducer function

export default usageUnitSlice.reducer;

export const { addWaitingAuthority, startEditAuthority, cancelEdAuthority } =
  usageUnitSlice.actions;

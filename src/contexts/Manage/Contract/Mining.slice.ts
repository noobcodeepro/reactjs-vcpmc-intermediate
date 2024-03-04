import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { db } from '../../../lib/firebase';
import { addDoc, collection, doc, getDocs, updateDoc } from 'firebase/firestore';

interface IState {
  miningContract: Array<IMiningContract>;
  waitingContract: Omit<IMiningContract, 'id'> | null;
  edittingContract: IMiningContract | null;
  isLoading: boolean;
}

export interface IMiningContract {
  id: string;
  contractId: string;
  contractUnit: IContractUnit;
  createAt: number;
  name: string;
  startDate: number;
  endDate: number;
  cancelReason: string;
  type: {
    name: string;
    contractValue?: string;
    distributeValue?: string;
    playsValue?: string;
  };
}

interface IContractUnit {
  address?: string;
  bank?: string;
  bankNumber?: number;
  dob: number;
  email: string;
  gender: boolean;
  idNumber: number;
  idProvideAt: number;
  idProvideDate: number;
  nationality: string;
  password: string;
  phoneNumber?: string;
  representer: string;
  role?: string;
  taxCode?: number;
  unitName: string;
  username: string;
}

const initialState: IState = {
  miningContract: [],
  waitingContract: null,
  edittingContract: null,
  isLoading: true,
};

export const contractCollection = collection(db, 'miningContracts');

export const getContracts = createAsyncThunk<Array<IMiningContract>>(
  'miningContract/getAll',
  async () => {
    const data = await getDocs(contractCollection);

    const filteredData = data.docs.map(doc => ({ ...doc.data(), id: doc.id }) as IMiningContract);

    return filteredData;
  },
);

// export const getContract = createAsyncThunk('athorizedContract/get', async (id: string) => {
//   const docRef = await getDoc(doc(db, `/miningContract/${id}`));
//   return docRef.data();
// })

export const addContract = createAsyncThunk(
  'miningContract/addContract',
  async (item: Omit<IMiningContract, 'id'>) => {
    try {
      console.log(item);

      const docRef = await addDoc(contractCollection, item);
      return { id: docRef.id, ...item };
    } catch (error) {
      console.log(error);
    }
  },
);

export const updateContract = createAsyncThunk(
  'miningContract/updateContract',
  async ({ item, id }: { item: Omit<IMiningContract, 'id'>; id: string }) => {
    const docRef = doc(db, `/miningContracts/${id}`);

    await updateDoc(docRef, item);

    return {
      ...item,
      id: docRef.id,
    };
  },
);

export const cancelContract = createAsyncThunk(
  'miningContract/cancelContract',
  async ({ cancelReason, id }: { cancelReason: string; id: string }) => {
    const docRef = doc(db, `/miningContracts/${id}`);
    await updateDoc(docRef, { cancelReason: cancelReason });

    return {
      id,
      cancelReason,
    };
  },
);

export const authorizeContractSlice = createSlice({
  name: 'miningContract',
  initialState,
  reducers: {
    addWatingContract: (state, action: PayloadAction<Omit<IMiningContract, 'id'>>) => {
      state.waitingContract = action.payload;
    },
    startEdittingContract: (state, action: PayloadAction<IMiningContract>) => {
      state.edittingContract = action.payload;
    },
    cancelEdittingContract: state => {
      state.edittingContract = null;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(getContracts.pending, state => {
        state.isLoading = true;
      })
      .addCase(getContracts.fulfilled, (state, action) => {
        state.miningContract = action.payload;
        state.isLoading = false;
      })
      .addCase(addContract.fulfilled, state => {
        state.edittingContract = null;
      })
      .addCase(updateContract.fulfilled, (state, action) => {
        state.edittingContract = null;
        state.miningContract.find((item, index) => {
          if (item.id === action.payload.id) {
            state.miningContract[index] = action.payload;
            return true;
          }
          return false;
        });
      })
      .addCase(cancelContract.fulfilled, (state, action) => {
        state.edittingContract = null;
        state.miningContract.find((item, index) => {
          if (item.id === action.payload.id) {
            state.miningContract[index].cancelReason = action.payload.cancelReason;
            return true;
          }
          return false;
        });
      }),
});

// Action creators are generated for each case reducer function

export default authorizeContractSlice.reducer;

export const { addWatingContract, startEdittingContract, cancelEdittingContract } =
  authorizeContractSlice.actions;

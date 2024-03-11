import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { db } from '../../../lib/firebase';
import { addDoc, collection, doc, getDocs, updateDoc } from 'firebase/firestore';

interface IState {
  authorizedContract: Array<IAuthorizeContract>;
  waitingContract: Omit<IAuthorizeContract, 'id'> | null;
  edittingContract: IAuthorizeContract | null;
  isLoading: boolean;
}

export interface IAuthorizeContract {
  id: string;
  contractId: string;
  authorizer: string;
  name: string;
  startDate: number;
  endDate: number;
  createAt: number;
  cancelReason: string;
  ownership: Array<number>;
  authorizedEntity: IIndividual;
  userAccount: {
    email: string;
    name: string;
    password: string;
  };
}

interface IIndividual {
  gender: boolean;
  address?: string;
  bank?: string;
  bankNumber?: number;
  dob: number;
  role?: string;
  idNumber: number;
  idProvideAt: number;
  idProvideDate: number;
  name: string;
  nationality: string;
  phoneNumber?: number;
  taxCode?: number;
  type: string;
  groupName: string;
  groupAddress?: string;
}

const initialState: IState = {
  authorizedContract: [],
  waitingContract: null,
  edittingContract: null,
  isLoading: true,
};

export const contractCollection = collection(db, 'authorizedContracts');

export const getContracts = createAsyncThunk<Array<IAuthorizeContract>>(
  'authorizedContract/getAll',
  async () => {
    const data = await getDocs(contractCollection);

    const filteredData = data.docs.map(
      doc => ({ ...doc.data(), id: doc.id }) as IAuthorizeContract,
    );

    return filteredData;
  },
);

// export const getContract = createAsyncThunk('athorizedContract/get', async (id: string) => {
//   const docRef = await getDoc(doc(db, `/authorizedContract/${id}`));
//   return docRef.data();
// })

export const addContract = createAsyncThunk(
  'authorizedContract/addContract',
  async (item: Omit<IAuthorizeContract, 'id'>) => {
    try {
      const docRef = await addDoc(contractCollection, item);
      return { id: docRef.id, ...item };
    } catch (error) {
      console.log(error);
    }
  },
);

export const updateContract = createAsyncThunk(
  'authorizedContract/updateContract',
  async ({ item, id }: { item: Omit<IAuthorizeContract, 'id'>; id: string }) => {
    const docRef = doc(db, `/authorizedContracts/${id}`);

    await updateDoc(docRef, item);

    return {
      ...item,
      id: docRef.id,
    };
  },
);

export const extendContract = createAsyncThunk(
  'authorizedContract/extendContract',
  async ({ extendDate, id }: { extendDate: number; id: string }) => {
    const docRef = doc(db, `/authorizedContracts/${id}`);
    await updateDoc(docRef, { endDate: extendDate });

    return {
      id,
      endDate: extendDate,
    };
  },
);

export const cancelContract = createAsyncThunk(
  'authorizedContract/cancelContract',
  async ({ cancelReason, id }: { cancelReason: string; id: string }) => {
    const docRef = doc(db, `/authorizedContracts/${id}`);
    await updateDoc(docRef, { cancelReason: cancelReason });

    return {
      id,
      cancelReason,
    };
  },
);

export const authorizeContractSlice = createSlice({
  name: 'authorizedContract',
  initialState,
  reducers: {
    addWatingContract: (state, action: PayloadAction<Omit<IAuthorizeContract, 'id'>>) => {
      state.waitingContract = action.payload;
    },
    startEdittingContract: (state, action: PayloadAction<IAuthorizeContract>) => {
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
        state.authorizedContract = action.payload;
        state.isLoading = false;
      })
      .addCase(addContract.fulfilled, state => {
        state.waitingContract = null;
      })
      .addCase(updateContract.fulfilled, (state, action) => {
        state.edittingContract = null;
        state.authorizedContract.find((item, index) => {
          if (item.id === action.payload.id) {
            state.authorizedContract[index] = action.payload;
            return true;
          }
          return false;
        });
      })
      .addCase(extendContract.fulfilled, (state, action) => {
        state.edittingContract = null;
        state.authorizedContract.find((item, index) => {
          if (item.id === action.payload.id) {
            state.authorizedContract[index].endDate = action.payload.endDate;
            return true;
          }
          return false;
        });
      })
      .addCase(cancelContract.fulfilled, (state, action) => {
        state.edittingContract = null;
        state.authorizedContract.find((item, index) => {
          if (item.id === action.payload.id) {
            state.authorizedContract[index].cancelReason = action.payload.cancelReason;
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

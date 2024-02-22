import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { db } from '../../../lib/firebase';
import { addDoc, collection, getDocs } from 'firebase/firestore';

interface IState {
  authorizedContract: Array<IAuthorizeContract>;
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
  address: string;
  bank: string;
  bankNumber: number;
  dob: number;
  idNumber: number;
  idProvideAt: number;
  idProvideDate: number;
  name: string;
  nationality: string;
  phoneNumber: number;
  taxCode: number;
  type: string;
}

const initialState: IState = {
  authorizedContract: [],
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

export const addContract = createAsyncThunk(
  'authorizedContract/addContract',
  async (item: Omit<IAuthorizeContract, 'id'>) => {
    try {
      console.log(item);

      const docRef = await addDoc(contractCollection, item);
      return { id: docRef.id, ...item };
    } catch (error) {
      console.log(error);
    }
  },
);

export const authorizeContractSlice = createSlice({
  name: 'authorizedContract',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(getContracts.pending, state => {
        state.isLoading = true;
      })
      .addCase(getContracts.fulfilled, (state, action) => {
        state.authorizedContract = action.payload;
        state.isLoading = false;
      }),
});

// Action creators are generated for each case reducer function

export default authorizeContractSlice.reducer;

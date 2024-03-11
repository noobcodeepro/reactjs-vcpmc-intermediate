import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { db } from '../../../lib/firebase';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

type AuthorityState = 'active' | 'in-active';

interface IState {
  authorities: Array<IAuthority>;
  waitingAuthority: Omit<IAuthority, 'id'> | null;
  edittingAuthority: IAuthority | null;
  isLoading: boolean;
}

export interface IAuthority {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  username: number;
  role: string;
  password: string;
  state: AuthorityState;
  expireDate: number;
  usingUnitId: string;
}

const initialState: IState = {
  authorities: [],
  waitingAuthority: null,
  edittingAuthority: null,
  isLoading: true,
};

export const authorityCollection = collection(db, 'authorizedUnit');

export const getAuthorizedUnit = createAsyncThunk<Array<IAuthority>>(
  'authorizedUnit/getAll',
  async () => {
    const data = await getDocs(authorityCollection);

    const filteredData = data.docs.map(doc => ({ ...doc.data(), id: doc.id }) as IAuthority);

    return filteredData;
  },
);

export const getAuthority = createAsyncThunk('authorizedUnit/getOne', async (id: string) => {
  const docRef = await getDoc(doc(db, `/authorizedUnit/${id}`));
  return {
    ...docRef.data(),
    id: docRef.id,
  } as IAuthority;
});

export const getReleventAuthority = createAsyncThunk(
  'authorizedUnit/getById',
  async (id: string) => {
    const q = query(authorityCollection, where('usingUnitId', '==', id));
    const querySnapshot = await getDocs(q);

    const data = querySnapshot.docs.map(d => {
      return {
        ...d.data(),
        id: d.id,
      } as IAuthority;
    });

    return data;
  },
);

export const addAuthority = createAsyncThunk(
  'authorizedUnit/add',
  async (item: Omit<IAuthority, 'id'>) => {
    try {
      const docRef = await addDoc(authorityCollection, item);
      return { id: docRef.id, ...item };
    } catch (error) {
      console.log(error);
    }
  },
);

export const updateAuthority = createAsyncThunk(
  'authorizedUnit/update',
  async ({ item, id }: { item: Omit<IAuthority, 'id'>; id: string }) => {
    const docRef = doc(db, `/authorizedUnit/${id}`);

    await updateDoc(docRef, item);

    return {
      ...item,
      id: docRef.id,
    };
  },
);

export const activeAuthority = createAsyncThunk(
  'authorizedUnit/activeAuthority',
  async ({ id }: { id: string }) => {
    const docRef = doc(db, `/authorizedUnit/${id}`);
    const isBanned = (await getDoc(docRef)).data()?.state === 'ban';
    if (!isBanned) {
      await updateDoc(docRef, { state: 'in-active' });
      return docRef.id;
    }
  },
);

export const deleteAuthorizedUnit = createAsyncThunk(
  'authorizedUnit/delete',
  async ({ idList }: { idList: Array<React.Key> }) => {
    const ids = await Promise.all(
      idList.map(async id => {
        const docRef = doc(db, `/authorizedUnit/${id}`);
        await deleteDoc(docRef);
        return docRef.id;
      }),
    );

    return ids;
  },
);

export const deactiveAuthority = createAsyncThunk(
  'authorizedUnit/deactivate',
  async ({ id }: { id: string }) => {
    const docRef = doc(db, `/authorizedUnit/${id}`);
    const isBanned = (await getDoc(docRef)).data()?.state === 'ban';
    if (!isBanned) {
      await updateDoc(docRef, { state: 'in-active' });
      return docRef.id;
    }
  },
);

export const authorizedUnitlice = createSlice({
  name: 'Authority',
  initialState,
  reducers: {
    addWaitingAuthority: (state, action: PayloadAction<Omit<IAuthority, 'id'>>) => {
      state.waitingAuthority = action.payload;
      state.isLoading = false;
    },
    startEditAuthority: (state, action: PayloadAction<IAuthority>) => {
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
      .addCase(getAuthorizedUnit.pending, state => {
        state.isLoading = true;
      })
      .addCase(getAuthorizedUnit.fulfilled, (state, action) => {
        state.authorities = action.payload;
        state.isLoading = false;
      })
      .addCase(addAuthority.fulfilled, state => {
        state.edittingAuthority = null;
      })
      .addCase(updateAuthority.fulfilled, (state, action) => {
        state.edittingAuthority = null;
        state.authorities.find((item, index) => {
          if (item.id === action.payload.id) {
            state.authorities[index] = action.payload;
            return true;
          }
          return false;
        });
      })
      .addCase(getReleventAuthority.fulfilled, (state, action) => {
        state.authorities = action.payload;
      })
      .addCase(activeAuthority.fulfilled, (state, action) => {
        state.edittingAuthority = null;
        state.authorities.find((a, index) => {
          if (a.id === action.payload) {
            state.authorities[index].state = 'active';
          }
        });
      })
      .addCase(deleteAuthorizedUnit.fulfilled, (state, action) => {
        const filteredData = state.authorities.filter(d => !action.payload.includes(d.id));
        state.authorities = filteredData;
      })
      .addCase(deactiveAuthority.fulfilled, (state, action) => {
        state.edittingAuthority = null;
        state.authorities.find((a, index) => {
          if (a.id === action.payload) {
            state.authorities[index].state = 'in-active';
          }
        });
      }),
});

// Action creators are generated for each case reducer function

export default authorizedUnitlice.reducer;

export const { addWaitingAuthority, startEditAuthority, cancelEdAuthority } =
  authorizedUnitlice.actions;

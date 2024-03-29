import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { db } from '../../../lib/firebase';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';

type DeviceState = 'active' | 'ban' | 'in-active';

interface IState {
  devices: Array<IDevice>;
  waitingDevice: Omit<IDevice, 'id'> | null;
  edittingDevice: IDevice | null;
  isLoading: boolean;
}

export interface IDevice {
  id: string;
  nameDevice: string;
  skuid: string;
  macAddress: string;
  expireDate: number;
  note: string;
  state: DeviceState;
  userAccount: {
    username: string;
    password: string;
    address: string;
  };
}

const initialState: IState = {
  devices: [],
  waitingDevice: null,
  edittingDevice: null,
  isLoading: true,
};

export const deviceCollection = collection(db, 'devices');

export const getDevices = createAsyncThunk<Array<IDevice>>('devices/getAll', async () => {
  const data = await getDocs(deviceCollection);

  const filteredData = data.docs.map(doc => ({ ...doc.data(), id: doc.id }) as IDevice);

  return filteredData;
});

export const getDevice = createAsyncThunk('devices/get', async (id: string) => {
  const docRef = await getDoc(doc(db, `/devices/${id}`));
  return {
    ...docRef.data(),
    id: docRef.id,
  } as IDevice;
});

export const addDevice = createAsyncThunk('devices/add', async (item: Omit<IDevice, 'id'>) => {
  try {
    const docRef = await addDoc(deviceCollection, item);
    return { id: docRef.id, ...item };
  } catch (error) {
    console.log(error);
  }
});

export const updateDevice = createAsyncThunk(
  'devices/update',
  async ({ item, id }: { item: Omit<IDevice, 'id'>; id: string }) => {
    const docRef = doc(db, `/devices/${id}`);

    await updateDoc(docRef, item);

    return {
      ...item,
      id: docRef.id,
    };
  },
);

export const activeDevice = createAsyncThunk(
  'devices/activeDevice',
  async ({ idList }: { idList: Array<React.Key> }) => {
    const ids = await Promise.all(
      idList.map(async id => {
        const docRef = doc(db, `/devices/${id}`);
        const isBanned = (await getDoc(docRef)).data()?.state === 'ban';
        if (!isBanned) {
          await updateDoc(docRef, { state: 'active' });
          return docRef.id;
        }
      }),
    );

    return ids;
  },
);

export const deleteDevices = createAsyncThunk(
  'devices/delete',
  async ({ idList }: { idList: Array<React.Key> }) => {
    const ids = await Promise.all(
      idList.map(async id => {
        const docRef = doc(db, `/devices/${id}`);
        await deleteDoc(docRef);
        return docRef.id;
      }),
    );

    return ids;
  },
);

export const deactiveDevice = createAsyncThunk(
  'devices/deactivate',
  async ({ idList }: { idList: Array<React.Key> }) => {
    const ids = await Promise.all(
      idList.map(async id => {
        const docRef = doc(db, `/devices/${id}`);
        const isBanned = (await getDoc(docRef)).data()?.state === 'ban';
        if (!isBanned) {
          await updateDoc(docRef, { state: 'in-active' });
          return docRef.id;
        }
      }),
    );

    return ids;
  },
);

export const banDevices = createAsyncThunk(
  'devices/banDevice',
  async ({ idList }: { idList: Array<React.Key> }) => {
    const ids = await Promise.all(
      idList.map(async id => {
        const docRef = doc(db, `/devices/${id}`);
        await updateDoc(docRef, { state: 'ban' });
        return docRef.id;
      }),
    );

    return ids;
  },
);

// export const deleteDevice = createAsyncThunk('devices/delete', async (id: string) => {
//   const docRef = doc(db, `/devices/${id}`);
//   await deleteDoc(docRef);
//   return docRef.id;
// });

export const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    addWaitingDevice: (state, action: PayloadAction<Omit<IDevice, 'id'>>) => {
      state.waitingDevice = action.payload;
    },
    startEdiDevice: (state, action: PayloadAction<IDevice>) => {
      state.edittingDevice = action.payload;
    },
    cancelEdDevice: state => {
      state.edittingDevice = null;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(getDevices.pending, state => {
        state.isLoading = true;
      })
      .addCase(getDevices.fulfilled, (state, action) => {
        state.devices = action.payload;
        state.isLoading = false;
      })
      .addCase(addDevice.fulfilled, state => {
        state.edittingDevice = null;
      })
      .addCase(updateDevice.fulfilled, (state, action) => {
        state.edittingDevice = null;
        state.devices.find((item, index) => {
          if (item.id === action.payload.id) {
            state.devices[index] = action.payload;
            return true;
          }
          return false;
        });
      })
      .addCase(activeDevice.fulfilled, (state, action) => {
        state.edittingDevice = null;
        const arrayList = action.payload;
        state.devices.map((d, index) => {
          if (arrayList.includes(d.id)) {
            state.devices[index] = { ...d, state: 'active' };
          }
        });
      })
      .addCase(deleteDevices.fulfilled, (state, action) => {
        const filteredData = state.devices.filter(d => !action.payload.includes(d.id));
        state.devices = filteredData;
      })
      .addCase(deactiveDevice.fulfilled, (state, action) => {
        state.edittingDevice = null;
        const arrayList = action.payload;
        state.devices.map((d, index) => {
          if (arrayList.includes(d.id)) {
            state.devices[index] = { ...d, state: 'in-active' };
          }
        });
      })
      .addCase(banDevices.fulfilled, (state, action) => {
        state.edittingDevice = null;
        const arrayList = action.payload;
        state.devices.map((d, index) => {
          if (arrayList.includes(d.id)) {
            state.devices[index] = { ...d, state: 'ban' };
          }
        });
      }),
});

// Action creators are generated for each case reducer function

export default deviceSlice.reducer;

export const { addWaitingDevice, startEdiDevice, cancelEdDevice } = deviceSlice.actions;

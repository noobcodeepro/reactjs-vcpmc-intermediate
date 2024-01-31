import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { auth, db, storage } from '../../lib/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { message } from 'antd';
import { DocumentData, doc, getDoc, updateDoc } from 'firebase/firestore';

// interface IUser {
//   username?: string | undefined;
//   email: string;
//   uid: string;
//   avatarUrl?: string;
// }

interface UserType {
  user: User | null;
  others: { role: 'Admin'; birthDay: number | 0; phoneNumber: string | '' };
  isEditing: boolean;
  isLoading: boolean;
}

const userStorage = localStorage.getItem('USER_INFO') || '';

const initialState: UserType = {
  user: userStorage ? (JSON.parse(userStorage) as User) : null || auth.currentUser,
  isEditing: false,
  isLoading: false,
  others: { role: 'Admin', birthDay: 0, phoneNumber: '' },
};

export const getUser = createAsyncThunk('auth/getUser', async () => {
  const user = await auth.currentUser;
  let otherFields: DocumentData | undefined;

  // Additional infomation query
  if (user) {
    console.log('Get user');

    const userDoc = await doc(db, 'users', user.uid);
    await getDoc(userDoc).then(res => {
      otherFields = res.data();
    });
  }
  return { user: user, otherFields } as {
    user: User;
    otherFields: { role: 'Admin'; birthDay: number | 0; phoneNumber: string | '' };
  };
});

// Login function
export const authLogin = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }) => {
    return await signInWithEmailAndPassword(auth, email, password);
  },
);

// Update avatar
export const updateAvatar = createAsyncThunk(
  'auth/updateAvatar',
  async ({ file, currentUser }: { file: File; currentUser: User }) => {
    const fileRef = ref(storage, 'avatars/' + currentUser.uid + '.png');

    await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);

    return await updateProfile(currentUser, { photoURL });
  },
);

// Logout
export const logOut = createAsyncThunk('auth/logOut', async () => {
  return await signOut(auth);
});

// Update Profile

export const saveUpdateProfile = createAsyncThunk(
  'auth/saveUpdateProfile',
  async ({
    firstName,
    lastName,
    birthDay,
    phoneNumber,
  }: {
    firstName: string | undefined | null;
    lastName: string | undefined | null;
    birthDay: number | null;
    phoneNumber: undefined | null | string;
  }) => {
    const user = auth.currentUser;

    if (user) {
      const { uid } = user;
      const userDocRef = doc(db, 'users', uid);
      // Cập nhật thông tin người dùng trong Firestore
      await updateProfile(user, { displayName: `${lastName} ${firstName}` });

      await updateDoc(userDocRef, {
        phoneNumber: phoneNumber,
        birthDay: birthDay,
      });
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    authLogin: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoading = false;
    },

    authLogout: state => {
      localStorage.removeItem('ACCESS_TOKEN');
      state.user = null;
    },
    authStartUpdate: state => {
      state.isEditing = true;
    },
    cancelEditProfile: state => {
      state.isEditing = false;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(authLogin.fulfilled, (state, action) => {
        if (action.payload.user.email && action.payload.user.displayName) {
          state.user = action.payload.user;
          state.isLoading = false;
          return;
        }
      })
      .addCase(getUser.fulfilled, (state, action) => {
        if (action.payload.user) {
          state.user = action.payload.user;
        }

        if (action.payload.otherFields) {
          const data = action.payload.otherFields;
          state.others.birthDay = data.birthDay;
          state.others.role = data.role;
        }
        // return action.payload.otherFields;
      })
      .addCase(authLogin.rejected, (_, action) => {
        console.log(action);
        const error = {
          message: '',
        };
        switch (action.error.code) {
          case 'auth/invalid-email':
            error.message = 'Email không hợp lệ';
            break;
          case 'auth/invalid-credential':
            error.message = 'Email và mật khẩu không đúng';
            break;
          default:
            error.message = 'Enexpected error';
            break;
        }
        throw error;
      })
      .addCase(updateAvatar.pending, state => {
        state.isLoading = true;
      })
      .addCase(updateAvatar.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(logOut.fulfilled, (state, action) => {
        if (action.type === 'auth/logOut/fulfilled') {
          message.info('Logout!');
        }
        state.user = null;
        localStorage.removeItem('USER_INFO');
      })
      .addCase(saveUpdateProfile.pending, state => {
        state.isLoading = true;
      })
      .addCase(saveUpdateProfile.fulfilled, (state, action) => {
        if (action.type === 'auth/saveUpdateProfile/fulfilled') {
          state.isLoading = false;
          state.isEditing = false;
        }
      }),
});

// Action creators are generated for each case reducer function
export const { setLoading, authStartUpdate, cancelEditProfile } = authSlice.actions;

export default authSlice.reducer;

import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, storage } from '../../lib/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

interface IUser {
  username?: string | undefined;
  email: string;
  uid: string;
  avatarUrl?: string;
}

interface UserType {
  user: IUser | null;
  isLoading: boolean;
}

// Get the user information if the data is saved in localStorage
const userFromStorage = localStorage.getItem('USER_INFO');
const initialState: UserType = {
  user: userFromStorage ? (JSON.parse(userFromStorage) as IUser) : null,
  isLoading: false,
};

// Login function
export const authLogin = createAsyncThunk(
  'auth/login',
  ({ email, password }: { email: string; password: string }) => {
    return signInWithEmailAndPassword(auth, email, password);
  },
);

export const updateAvatar = createAsyncThunk(
  'auth/updateAvatar',
  async ({ file, currentUser }: { file: File; currentUser: User }) => {
    const fileRef = ref(storage, currentUser.uid + '.png');

    await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);

    updateProfile(currentUser, { photoURL });
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    authLogin: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.isLoading = false;
    },

    authLogout: state => {
      localStorage.removeItem('ACCESS_TOKEN');
      state.user = null;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(authLogin.fulfilled, (state, action) => {
        if (action.payload.user.email && action.payload.user.displayName) {
          state.user = {
            email: action.payload.user.email,
            username: action.payload.user.displayName,
            uid: action.payload.user.uid,
          };
          state.isLoading = false;
          return;
        }
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
      }),
});

// Action creators are generated for each case reducer function
export const { setLoading } = authSlice.actions;

export default authSlice.reducer;

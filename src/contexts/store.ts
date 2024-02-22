import { configureStore } from '@reduxjs/toolkit';
import recordReducer from './Record/record.slice';
import authReducer from './Auth/auth.slice';
import { useDispatch } from 'react-redux';
import playlistReducer from './Playlist/playlist.slice';
import authorizeContractReducer from './Manage/Contract/Authorize.slice';

export const store = configureStore({
  reducer: {
    record: recordReducer,
    auth: authReducer,
    playlist: playlistReducer,
    authorizedContract: authorizeContractReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

import { configureStore } from '@reduxjs/toolkit';
import recordReducer from './Record/record.slice';
import authReducer from './Auth/auth.slice';
import { useDispatch } from 'react-redux';
export const store = configureStore({
  reducer: {
    record: recordReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

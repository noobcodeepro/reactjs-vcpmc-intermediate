import { createSlice } from '@reduxjs/toolkit';
import { Record } from '../../types/record.type';

const initialState: Array<Record> = [
  {
    name: 'Mất em',
    isrcId: 'KRA40105463',
    singer: 'Phan Mạnh Quỳnh',
    author: 'Phan Mạnh Quỳnh',
    producer: 'Phan Mạnh Quỳnh',
    musicType: 'Ballad',
    coverImage:
      'https://plus.unsplash.com/premium_photo-1680079229453-c6b54d3911e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8',
    dateExpired: new Date('2023-11-20T00:00:00'),
  },
  {
    name: 'Ergonomic Fresh Chips',
    isrcId: 'KRA40105519',
    singer: 'Chillies',
    author: 'Chillies',
    producer: 'Chillies',
    musicType: 'Ballad',
    coverImage:
      'https://plus.unsplash.com/premium_photo-1680079229453-c6b54d3911e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8',
    dateExpired: new Date('2023-11-20T00:00:00'),
  },
];

export const recordSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function

export default recordSlice.reducer;

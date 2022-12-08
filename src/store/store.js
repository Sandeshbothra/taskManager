import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './slice/TaskSlice';

export const store = configureStore({
  reducer: {
    task: taskReducer,
  },
});
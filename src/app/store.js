import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/authReducer';
import chatReducer from '../redux/chatReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
  },
});

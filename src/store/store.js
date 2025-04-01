import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import darkModeReducer from './features/darkMode/darkModeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    darkMode: darkModeReducer,
  },
});

export default store;

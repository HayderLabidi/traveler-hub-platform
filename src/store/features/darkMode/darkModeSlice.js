import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDarkMode: localStorage.getItem('darkMode') === 'true',
};

const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem('darkMode', state.isDarkMode);
    },
    setDarkMode: (state, action) => {
      state.isDarkMode = action.payload;
      localStorage.setItem('darkMode', action.payload);
    },
  },
});

export const { toggleDarkMode, setDarkMode } = darkModeSlice.actions;

export const selectIsDarkMode = (state) => state.darkMode.isDarkMode;

export default darkModeSlice.reducer;

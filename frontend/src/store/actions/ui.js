import * as types from '../constants/actionTypes';

export const setLoading = (isLoading) => ({
  type: types.SET_LOADING,
  payload: isLoading
});

export const toggleSidebar = () => ({
  type: types.TOGGLE_SIDEBAR
});

export const setTheme = (theme) => ({
  type: types.SET_THEME,
  payload: theme
});

export const setSuccess = (message) => ({
  type: types.SET_SUCCESS,
  payload: message
});

import * as types from '../constants/actionTypes';

// Login actions
export const loginRequest = (credentials) => ({
  type: types.LOGIN_REQUEST,
  payload: credentials
});

export const loginSuccess = (user) => ({
  type: types.LOGIN_SUCCESS,
  payload: user
});

export const loginFailure = (error) => ({
  type: types.LOGIN_FAILURE,
  payload: error
});

// Register actions
export const registerRequest = (userData) => ({
  type: types.REGISTER_REQUEST,
  payload: userData
});

export const registerSuccess = (user) => ({
  type: types.REGISTER_SUCCESS,
  payload: user
});

export const registerFailure = (error) => ({
  type: types.REGISTER_FAILURE,
  payload: error
});

// Profile actions
export const updateProfileRequest = (profileData) => ({
  type: types.UPDATE_PROFILE_REQUEST,
  payload: profileData
});

export const updateProfileSuccess = (profile) => ({
  type: types.UPDATE_PROFILE_SUCCESS,
  payload: profile
});

export const updateProfileFailure = (error) => ({
  type: types.UPDATE_PROFILE_FAILURE,
  payload: error
});

export const fetchProfileRequest = () => ({
  type: types.FETCH_PROFILE_REQUEST
});

export const fetchProfileSuccess = (profile) => ({
  type: types.FETCH_PROFILE_SUCCESS,
  payload: profile
});

export const fetchProfileFailure = (error) => ({
  type: types.FETCH_PROFILE_FAILURE,
  payload: error
});

// Auth utility actions
export const logout = () => ({
  type: types.LOGOUT
});

export const clearError = () => ({
  type: types.CLEAR_ERROR
});

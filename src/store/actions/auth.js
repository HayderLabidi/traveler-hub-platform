import * as types from '../constants/actionTypes';

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

export const logout = () => ({
  type: types.LOGOUT
});

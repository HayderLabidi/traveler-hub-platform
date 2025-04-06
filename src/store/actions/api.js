import * as types from '../constants/actionTypes';

export const apiRequest = () => ({
  type: types.API_REQUEST
});

export const apiSuccess = (data) => ({
  type: types.API_SUCCESS,
  payload: data
});

export const apiFailure = (error) => ({
  type: types.API_FAILURE,
  payload: error
});

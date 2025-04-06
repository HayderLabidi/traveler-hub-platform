import { API_REQUEST, API_SUCCESS, API_FAILURE } from '../constants/actionTypes';

export const apiRequest = () => ({
  type: API_REQUEST
});

export const apiSuccess = (data: any) => ({
  type: API_SUCCESS,
  payload: data
});

export const apiFailure = (error: string) => ({
  type: API_FAILURE,
  payload: error
});

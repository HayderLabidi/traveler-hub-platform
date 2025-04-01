import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import apiReducer from './apiReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  api: apiReducer,
});

export default rootReducer;

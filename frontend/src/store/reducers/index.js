import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import apiReducer from './apiReducer';
import uiReducer from './uiReducer';
import preferencesReducer from './preferencesReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  api: apiReducer,
  ui: uiReducer,
  preferences: preferencesReducer,
});

export default rootReducer;

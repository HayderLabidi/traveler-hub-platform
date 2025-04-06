import * as types from '../constants/actionTypes';

const initialState = {
  language: 'en',
  notifications: true,
  emailUpdates: false,
  displayDensity: 'comfortable',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
};

const preferencesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_PREFERENCES:
      return {
        ...state,
        ...action.payload
      };
    case types.RESET_PREFERENCES:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default preferencesReducer;

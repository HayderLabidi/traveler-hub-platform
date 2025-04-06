import * as types from '../constants/actionTypes';

export const updatePreferences = (preferences) => ({
  type: types.UPDATE_PREFERENCES,
  payload: preferences
});

export const resetPreferences = () => ({
  type: types.RESET_PREFERENCES
});

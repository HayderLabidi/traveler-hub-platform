import * as types from '../constants/actionTypes';

const initialState = {
  loading: false,
  sidebarOpen: false,
  theme: 'light',
  successMessage: null
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case types.TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebarOpen: !state.sidebarOpen
      };
    case types.SET_THEME:
      return {
        ...state,
        theme: action.payload
      };
    case types.SET_SUCCESS:
      return {
        ...state,
        successMessage: action.payload
      };
    default:
      return state;
  }
};

export default uiReducer;

import * as types from '../constants/actionTypes';

const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        isAuthenticated: true,
        error: null
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuthenticated: false
      };
    case types.LOGOUT:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default authReducer;

import * as types from '../constants/actionTypes';

const initialState = {
  user: null,
  profile: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  registrationSuccess: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // Login cases
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

    // Register cases
    case types.REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        registrationSuccess: false
      };
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        registrationSuccess: true,
        error: null
      };
    case types.REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        registrationSuccess: false
      };

    // Profile cases
    case types.UPDATE_PROFILE_REQUEST:
    case types.FETCH_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case types.UPDATE_PROFILE_SUCCESS:
    case types.FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: action.payload,
        error: null
      };
    case types.UPDATE_PROFILE_FAILURE:
    case types.FETCH_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    // Utility cases
    case types.LOGOUT:
      return {
        ...initialState
      };
    case types.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

export default authReducer;

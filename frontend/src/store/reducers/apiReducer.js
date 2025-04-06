import * as types from '../constants/actionTypes';

const initialState = {
  loading: false,
  error: null,
  data: null
};

const apiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.API_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case types.API_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case types.API_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default apiReducer;

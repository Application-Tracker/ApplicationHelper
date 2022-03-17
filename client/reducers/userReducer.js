import * as types from '../constants/actionTypes';

const initialState = {
  isAuthenticated: false,
  id: ''
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.AUTHENTICATE_USER:
      return {
        ...state,
        isAuthenticated: true,
      };
    default:
      return state;
  }
};


export default userReducer;
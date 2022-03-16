import * as types from '../constants/actionTypes';

const initialState = {
  username: '',
  password: '',
  response: { valid: false },
  validUser: undefined,
  validLogin: undefined,
};

const textFieldReducer = (state = initialState, action) => {
  //get data
  switch (action.type) {
    case types.GET_USERNAME:
      const userName = action.payload;
      return {
        ...state,
        username: userName,
    };

    case types.GET_PASSWORD:
      const password = action.payload;
      return {
        ...state,
        password: password,
    };

    default:
      return state;
  }
  
}

export default textFieldReducer;

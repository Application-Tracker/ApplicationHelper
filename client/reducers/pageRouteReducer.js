import * as types from '../constants/actionTypes';

const initialState = {
  page: 'signUp',
};

const PageRouter = (state = initialState, action) => {

  switch (action.type) {
    case types.CHANGE_PAGE:
      return {
        ...state,
        page: action.payload,
      };

    case types.SIGN_UP:
      return {
        ...state,
        page: 'signUp',
      };

    case types.LOGIN:
      return {
        ...state,
        page: 'login',
      };

    case types.PROFILE:
      return {
        ...state,
        page: 'profile',
      };

    default:
      return state;
  }
};

export default PageRouter;

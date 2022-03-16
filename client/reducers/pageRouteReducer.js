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

    case types.LANDING_PAGE:
      return {
        ...state,
        page: 'landingPage',
      };

    default:
      return state;
  }
};

export default PageRouter;

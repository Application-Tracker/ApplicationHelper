import * as types from '../constants/actionTypes';


export const addUserActionCreator = payload => ({
  type: types.ADD_USER,
  payload: payload.target[0].value
});

export const changePageActionCreator = pl => ({
  type: types.CHANGE_PAGE,
  payload: pl,
});

export const createAccountAction = (payload, res) => ({
  type: types.CREATE_ACCOUNT,
  payload: { payload,  res },
});

export const loginAction = (e, mode, serverRes) => ({
  type: types.LOGIN,
  payload: { e, mode, serverRes },
});


export const toLandingPageAction = () => ({
  type: types.LANDING_PAGE,
});

export const toLoginPageAction = () => ({
  type: types.LOGIN_PAGE,
});

export const toSignUpPageAction = () => ({
  type: types.SIGN_UP,
});

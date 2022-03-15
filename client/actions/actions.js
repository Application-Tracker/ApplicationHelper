import * as types from '../constants/actionTypes';


export const addUserActionCreator = e => ({
  type: types.ADD_USER,
  payload: e.target[0].value
});

export const createAccountAction = (e, mode, serverRes) => ({
  type: types.CREATE_ACCOUNT,
  payload: { e, mode, serverRes },
});



export const toProfilePageAction = () => ({
  type: types.PROFILE,
});

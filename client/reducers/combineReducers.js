import { combineReducers } from 'redux';
import pageRouteReducer from './pageRouteReducer';
import textFieldReducer from './textFieldReducer';
import userReducer from './userReducer';

const reducers = combineReducers({
  pageRouter: pageRouteReducer,
  textField: textFieldReducer,
  user: userReducer,
});

export default reducers;
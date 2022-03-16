import { combineReducers } from 'redux';
import pageRouteReducer from './pageRouteReducer';
import textFieldReducer from './textFieldReducer';
import userReducer from './userReducer';
import newAppReducer from './newAppReducer';

const reducers = combineReducers({
  pageRouter: pageRouteReducer,
  textField: textFieldReducer,
  user: userReducer,
  newApp: newAppReducer,
});

export default reducers;
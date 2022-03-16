import { combineReducers } from 'redux';
import pageRouteReducer from './pageRouteReducer';
import textFieldReducer from './textFieldReducer';

const reducers = combineReducers({
  pageRouter: pageRouteReducer,
  textField: textFieldReducer,
});

export default reducers;
import { combineReducers } from 'redux';
import pageRouteReducer from './pageRouteReducer';
//import textFieldReducer from './textFieldReducer';

const reducers = combineReducers({
  navigation: pageRouteReducer,
  textField: textFieldReducer,
});

export default reducers;
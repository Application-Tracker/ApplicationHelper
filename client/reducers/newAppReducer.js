import * as types from '../constants/actionTypes';

const initialState = {
  applications: [],
};

const newAppReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.NEW_APP:  
      
      // make deep copy of existing applications array 
      const newApplicationsArray = JSON.parse(JSON.stringify(state.applications));

      // action.payload will be an object that represents an application 
      newApplicationsArray.push(action.payload)

      return {
        ...state, 
        applications: newApplicationsArray,
      }

    default:
      return state;
  };
}

export default newAppReducer;
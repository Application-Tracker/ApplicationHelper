import React from 'react';
import Application from './Application';



const AppContainer = () => {
  //fetch completed applications from database
  //use map to create component for every object in arra
  
  return (
    <div className='appContainer'>
      <h1>Applications: </h1>
      <Application />
    </div>
  )
};

export default AppContainer;
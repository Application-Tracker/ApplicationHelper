import { Routes, Route } from 'react-router-dom';
import React from 'react';
import Navbar from './components/Navbar.jsx';
import MainContainer from './components/MainContainer.jsx';
import Signup from './components/signup';

const App = () => {
  return (
    <Routes> 
      <Route index element = {<Signup/>}>

      </Route>
    </Routes>
  )
};

export default App;
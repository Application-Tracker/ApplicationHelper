import { Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Header from './components/Header';
import MainContainer from './components/MainContainer.jsx';
import Signup from './components/signup';
import { useNavigate } from 'react-router-dom';
import AppContainer from './components/AppContainer.jsx';
import Login from './components/Login.jsx';
import NewApp from './components/NewApp.jsx';
import Layout from './components/Layout.jsx';

const App = () => {

  
  const [isAuthenticated, setIsAuthenticated] = useState(false); 


  const navigate = useNavigate();
  
  useEffect(() => {
    fetch('/api/user/authenticate')
      .then(res => res.json())
      .then(payload => {
        if (payload.success === true) {
          navigate('/user')
          // could make isAuthenticated part of global redux state
          setIsAuthenticated(true)
          // could redirect here 
        } else setIsAuthenticated(false);
      })
      .catch(err => { console.log(err) });
  }, [])

  
  return (
    <Routes> 
      <Route index element = {<Login/>}/>
      <Route path='/signup' element={<Signup />}/>
      <Route path='/user' element={<Layout/>}>
        <Route path='applications' element={<AppContainer />}/>
        <Route path='newapp' element={<NewApp/>}/>
      </Route> 
    </Routes>
  )
};

export default App;
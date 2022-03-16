import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import MainContainer from './components/MainContainer.jsx';

const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetch('/api/user/authenticate')
      .then(res => res.json())
      .then(payload => {
        if (payload.success === true) {
          // could make isAuthenticated part of global redux state
          setIsAuthenticated(true)
          // could redirect here 
        } else setIsAuthenticated(false);
      })
      .catch(err => { console.log(err) });
  }, [])

  return (
    <div>Hello this is App.jsx!</div>
  )
};

export default App;
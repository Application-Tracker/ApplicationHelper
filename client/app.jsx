<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar.jsx';
=======
import React from 'react';
>>>>>>> 484f3d7220dec31d699b5ae58481476f34ed4dfe
import MainContainer from './components/MainContainer.jsx';
import Header from './components/Header.jsx';

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
    <section>
      <Header />
      <MainContainer />
    </section>
  )
};

export default App;
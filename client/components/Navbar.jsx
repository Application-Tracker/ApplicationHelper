import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';



const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className='navbar'>
      <ul className='ul'>
        <li>
          <button type='button'>Applications</button>
        </li>
        <li>
          <button onClick={() => {navigate('/newapp')}} type='button'>Add New Application</button>
        </li>
        <li>
          <button onClick={() => {navigate('/')}}type='button'>Sign Out</button>
        </li>
      </ul>
    </nav>
  )
};

export default Navbar;
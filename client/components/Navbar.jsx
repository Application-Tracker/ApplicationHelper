import React from 'react';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <ul className='ul'>
        <li>
          <button type='button'>Applications</button>
        </li>
        <li>
          <button type='button'>Add New Application</button>
        </li>
        <li>
          <button type='button'>Sign Out</button>
        </li>
      </ul>
    </nav>
  )
};

export default Navbar;
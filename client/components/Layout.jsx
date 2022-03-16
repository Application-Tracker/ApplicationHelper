import React from 'react'
import Navbar from './Navbar';
import Header from './Header';
import { Outlet } from 'react-router-dom';


const Layout = () => {
  return (
    <>
      <Header />
      <Navbar />
      <div>Layout</div>
      <div>
        <Outlet/>
      </div>
    </>
  )
}

export default Layout
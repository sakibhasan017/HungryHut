import React from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="logo-text">
        <h1>HungryHut<span>.</span></h1>
        <p>Admin Panel</p>
      </div>
      <img className="profile" src={assets.profile_image} alt="Profile" />
    </div>
  );
};

export default Navbar;

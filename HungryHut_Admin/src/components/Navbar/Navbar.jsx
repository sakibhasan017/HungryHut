import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="logo-text">
        <h1>HungryHut<span>.</span></h1>
        <p>Admin Panel</p>
      </div>
      <Link to="/"> <img className="profile" src={assets.profile_image} alt="Profile" /></Link>
    </div>
  );
};

export default Navbar;

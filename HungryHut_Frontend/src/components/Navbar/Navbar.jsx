import React, { useContext, useState } from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
import {Link, useNavigate} from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'

const Navbar = ({setShowLogin}) => {
  
  const [menu,setMenu]=useState("Home");
  const {getTotalCartAmmount,token,setToken}= useContext(StoreContext);
  
  const navigate= useNavigate();
  const logout= ()=>{
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
    window.location.reload();
  }

  return (
    <div className='navbar'>
      <Link to='/'><p className='logo'>HungryHut.</p></Link>
      <ul className='navbar-menu'>
        <Link to="/" onClick={()=>setMenu("Home")} className={menu==="Home"?"active":""}>Home</Link>
        <Link to="/#explore-menu" onClick={()=>setMenu("Menu")} className={menu==="Menu"?"active":""}>Menu</Link>
        <Link to="/#trending-food" onClick={()=>setMenu("Trending")} className={menu==="Trending"?"active":""}>Trending Food</Link>
        <a href="#footer" onClick={()=>setMenu("Contact-us")} className={menu==="Contact-us"?"active":""}>Contact Us</a>
      </ul>
      <div className="navbar-right">
  <div className="navbar-search-icon">
    <Link to='/nutrition-suggest' className="nutrition-suggest-btn">🍽️ Nutrition Suggest</Link>
    <Link to='/cart'><img src={assets.basket_icon} alt="Cart" /></Link>
    <div className={getTotalCartAmmount() === 0 ? "" : "dot"}></div>
  </div>
  {!token ? (
    <button onClick={() => setShowLogin(true)}>Sign In</button>
  ) : (
    <div className='navbar-profile'>
      <img src={assets.profile_icon} alt="Profile" />
      <ul className="nav-profile-dropdown">
        <li onClick={() => navigate('/profile')}><img src={assets.profile_icon} alt="" /><p>Profile</p></li>
        <hr />
        <li onClick={() => navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
        <hr />
        <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>LogOut</p></li>
        <hr />
      </ul>
    </div>
  )}
</div>

    </div>
  )
}

export default Navbar
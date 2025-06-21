import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
          <div className="footer-content-left">
                <p className='logo'>HungryHut.</p>
                <p>At HungryHut, we blend traditional flavors with modern taste to serve meals that feel like home. Whether it's a family dinner or a quick lunch, our food is made with care, passion, and the finest ingredients to make every bite memorable.</p>
                <div className="footer-social-icons">
                  <img src={assets.facebook_icon} alt="" />
                  <img src={assets.twitter_icon} alt="" />
                  <img src={assets.linkedin_icon} alt="" />
                </div>
          </div>
          <div className="footer-content-center">
              <h2>COMPANY</h2>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/myorders">Track Order</Link></li>
                <li><Link to="/terms-and-conditions">Terms & Conditions</Link></li>
                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              </ul>
          </div>
          <div className="footer-content-right">
              <h2>GET IN TOUCH</h2>
              <ul>
                <li>+880 1601215756</li>
                <li>support@hungryhut.com</li>
                
              </ul>
          </div>
          
        </div>
        <hr />
        <p className='footer-copyright'>Copyright 2025 &copy; hungryHut.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer
import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

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
                <li>Home</li>
                <li>About Us</li>
                <li>Delivary</li>
                <li>Privacy Policy</li>
              </ul>
          </div>
          <div className="footer-content-right">
              <h2>GET IN TOUCH</h2>
              <ul>
                <li>+880 1601215756</li>
                <li>hassansakib512@gmail.com</li>
                
              </ul>
          </div>
          
        </div>
        <hr />
        <p className='footer-copyright'>Copyright 2025 &copy; hungryHut.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer
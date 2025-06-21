import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState('Login');
  const [showForgot, setShowForgot] = useState(false);
  const [forgotData, setForgotData] = useState({ email: '', petName: '', newPassword: '', confirmPassword: '' });

  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    petName: ''
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onForgotChange = (event) => {
    const { name, value } = event.target;
    setForgotData((prev) => ({ ...prev, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState === 'Login') {
      newUrl += '/api/users/login';
    } else {
      newUrl += '/api/users/register';
    }

    const response = await axios.post(newUrl, data);

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      window.location.reload();
      
    } else {
      alert(response.data.message);
    }
  };

  const onResetPassword = async (event) => {
    event.preventDefault();
    if (forgotData.newPassword !== forgotData.confirmPassword) {
      return alert("Passwords do not match");
    }

    const response = await axios.post(url + '/api/users/reset-password', forgotData);
    if (response.data.success) {
      alert("Password successfully reset");
      setShowForgot(false);
    } else {
      alert(response.data.message);
    }
  };

  return (
    <div className="login-popup">
      {!showForgot ? (
        <form onSubmit={onLogin} className="login-popup-container">
          <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
          </div>
          <div className="login-popup-inputs">
            {currState === "Sign Up" && (
              <>
                <input name="name" onChange={onChangeHandler} value={data.name} type="text" placeholder="Your Name" required />
                <input name="petName" onChange={onChangeHandler} value={data.petName} type="text" placeholder="What is your pet name?" required />
              </>
            )}
            <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Your Email" required />
            <input name="password" onChange={onChangeHandler} value={data.password} type="password" placeholder="Password" required />
          </div>
          <button type="submit">{currState === "Sign Up" ? "Create Account" : "Login"}</button>
          {currState === "Login" && (
            <p className="forgot-password" onClick={() => setShowForgot(true)}>Forgot Password?</p>
          )}
          <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use and Privacy Policy.</p>
          </div>
          {currState === "Sign Up"
            ? <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login Here</span></p>
            : <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click Here!</span></p>
          }
        </form>
      ) : (
        <form onSubmit={onResetPassword} className="login-popup-container">
          <div className="login-popup-title">
            <h2>Reset Password</h2>
            <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
          </div>
          <div className="login-popup-inputs">
            <input name="email" onChange={onForgotChange} value={forgotData.email} type="email" placeholder="Your Email" required />
            <input name="petName" onChange={onForgotChange} value={forgotData.petName} type="text" placeholder="What is your pet name?" required />
            <input name="newPassword" onChange={onForgotChange} value={forgotData.newPassword} type="password" placeholder="New Password" required />
            <input name="confirmPassword" onChange={onForgotChange} value={forgotData.confirmPassword} type="password" placeholder="Confirm Password" required />
          </div>
          <button type="submit">Reset Password</button>
          <p className="forgot-password" onClick={() => setShowForgot(false)}>Back to Login</p>
        </form>
      )}
    </div>
  );
};

export default LoginPopup;

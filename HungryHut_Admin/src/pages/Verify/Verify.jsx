import React, { useState } from 'react';
import './Verify.css';

const Verify = ({ onVerify, onCancel }) => {
  const [input, setInput] = useState('');
  const PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === PASSWORD) {
      onVerify(); 
    } else {
      alert("Incorrect Password");
    }
  };

  return (
    <div className="verify-overlay">
      <form className="verify-box" onSubmit={handleSubmit}>
        <h2>Enter Admin Password</h2>
        <input
          type="password"
          placeholder="Enter password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="verify-actions">
          <button type="submit">Verify</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default Verify;

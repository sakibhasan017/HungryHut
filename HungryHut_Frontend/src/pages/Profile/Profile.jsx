import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";

const Profile = () => {
  
  const { token, url } = useContext(StoreContext);
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (token) {
        const res = await axios.get(`${url}/api/users/profile`, {
          headers: { token },
        });
        if (res.data.success) {
          setUserData(res.data.user);
        }
      }
    };
    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage("New and confirm passwords do not match.");
      return;
    }

    try {
      const res = await axios.patch(
        `${url}/api/users/change-password`,
        {
          currentPass: formData.currentPassword,
          newPass: formData.newPassword,
        },
        { headers: { token } }
      );

      if (res.data.success) {
        setMessage("Password updated successfully.");
        setError(true);
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        setMessage(res.data.message || "Failed to change password.");
        setError(true);
      }
    } catch (err) {
      setMessage("Error while changing password.");
      setError(true);
    }
  };

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <div className="profile-box">
        <p><strong>Name:</strong> {userData.name}</p>
        <p><strong>Email:</strong> {userData.email}</p>

        <h3>Change Password</h3>
        <form onSubmit={handleSubmit} className="password-form">
          <input
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            value={formData.currentPassword}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button type="submit">Save</button>
        </form>
        {message && <p className={`message ${error ? 'error' : 'success'}`}>{message}</p>}
      </div>
    </div>
  );
};


export default Profile
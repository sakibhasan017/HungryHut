import React, { useEffect, useState } from 'react';
import './Modify.css';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Verify from '../../pages/Verify/Verify'; 

const Modify = ({ url }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [food, setFood] = useState(null);
  const [showVerify, setShowVerify] = useState(false); 

  const [formData, setFormData] = useState({
    description: '',
    price: ''
  });

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axios.get(`${url}/api/food/get/${id}`);
        const foodData = response.data.food;
        setFood(foodData);
        setFormData({
          description: foodData.description || '',
          price: foodData.price || ''
        });
      } catch (error) {
        toast.error("Error loading food item");
      }
    };
    fetchFood();
  }, [id, url]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitToServer = async () => {
    try {
      const response = await axios.patch(`${url}/api/food/update/${id}`, formData);
      if (response.data.success) {
        toast.success("Food updated successfully");
        navigate('/list');
      } else {
        toast.error("Failed to update");
      }
    } catch (error) {
      toast.error("Error updating food");
    }
    setShowVerify(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowVerify(true); 
  };

  if (!food) return <div>Loading...</div>;

  return (
    <div className="modify-page">
      <h2>Modify Food Item</h2>
      <form onSubmit={handleSubmit} className="modify-form">
        <div className="modify-field">
          <label>Product Name:</label>
          <input type="text" value={food.name} disabled />
        </div>

        <div className="modify-field">
          <label>Category:</label>
          <input type="text" value={food.category} disabled />
        </div>

        <div className="modify-field">
          <label>Image Preview:</label>
          <img src={`${url}/images/${food.image}`} alt={food.name} className="modify-image-preview" />
        </div>

        <div className="modify-field">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            required
          />
        </div>

        <div className="modify-field">
          <label>Price (BDT):</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="modify-btn">Save Changes</button>
      </form>

      {showVerify && (
        <Verify
          onVerify={submitToServer}
          onCancel={() => setShowVerify(false)}
        />
      )}
    </div>
  );
};

export default Modify;

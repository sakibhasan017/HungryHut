import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Verify from '../../pages/Verify/Verify'; 

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [showVerify, setShowVerify] = useState(false); 
  const [selectedId, setSelectedId] = useState(null); 
  const navigate = useNavigate();

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching list");
      }
    } catch (err) {
      toast.error("Server Error");
    }
  };

  const removeFood = async () => {
    if (!selectedId) return;
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: selectedId });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList(); 
      } else {
        toast.error("Failed to remove");
      }
    } catch (err) {
      toast.error("Server Error");
    }
    setShowVerify(false);
    setSelectedId(null);
  };

  const handleDeleteClick = (id) => {
    setSelectedId(id);     
    setShowVerify(true);   
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <h1>All Foods List</h1>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Actions</b>
        </div>

        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            <img src={`${url}/images/` + item.image} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.price} BDT</p>
            <div className="list-actions">
              <button className="edit-btn" onClick={() => navigate(`/modify/${item._id}`)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDeleteClick(item._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {showVerify && (
        <Verify
          onVerify={removeFood}
          onCancel={() => {
            setShowVerify(false);
            setSelectedId(null);
          }}
        />
      )}
    </div>
  );
};

export default List;

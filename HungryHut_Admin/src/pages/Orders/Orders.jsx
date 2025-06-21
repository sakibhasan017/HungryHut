import React, { useEffect, useState } from 'react';
import './Orders.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';
import Verify from '../../pages/Verify/Verify';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [showVerify, setShowVerify] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [pendingStatus, setPendingStatus] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error");
      }
    } catch (err) {
      toast.error("Server Error");
    }
  };

  const triggerStatusChange = (event, orderId) => {
    setSelectedOrderId(orderId);
    setPendingStatus(event.target.value);
    setShowVerify(true);
  };

  const statusHandler = async () => {
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId: selectedOrderId,
        status: pendingStatus,
      });

      if (response.data.success) {
        toast.success("Order status updated");
        await fetchAllOrders();
      } else {
        toast.error("Failed to update order");
      }
    } catch (err) {
      toast.error("Server Error");
    }
    setShowVerify(false);
    setSelectedOrderId(null);
    setPendingStatus('');
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h1>Order Page</h1>
      <div className="order-filter">
        <label htmlFor="statusFilter" style={{ marginRight: "10px" }}>Filter by Status:</label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            backgroundColor: "#f0f8ff"
          }}
        >
          <option value="All">All</option>
          <option value="Food Processing">Food Processing</option>
          <option value="Out for Delivery">Out For Delivery</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>

      {/* Order List */}
      <div className="order-list">
        {orders
          .filter(order => statusFilter === 'All' || order.status === statusFilter)
          .map((order, index) => (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className="order-item-food">
                  {order.items.map((item, idx) =>
                    idx === order.items.length - 1
                      ? `${item.name} x ${item.quantity}`
                      : `${item.name} x ${item.quantity}, `
                  )}
                </p>
                <div className="order-item-name">
                  {order.address.firstName + " " + order.address.lastName}
                  <p>{order.address.street + ", "}</p>
                  <p>
                    {order.address.city + ", " +
                      order.address.state + ", " +
                      order.address.country + ", " +
                      order.address.zipcode}
                  </p>
                </div>
                <p className="order-item-phone">{order.address.phone}</p>
              </div>
              <p>Items: {order.items.length}</p>
              <p>{order.amount}.00 BDT</p>
              <select
                onChange={(event) => triggerStatusChange(event, order._id)}
                value={order.status}
              >
                <option value="Food Processing">Food Processing</option>
                <option value="Out for Delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))}
      </div>

      {/* Verify Password Modal */}
      {showVerify && (
        <Verify
          onVerify={statusHandler}
          onCancel={() => {
            setShowVerify(false);
            setSelectedOrderId(null);
            setPendingStatus('');
          }}
        />
      )}
    </div>
  );
};

export default Orders;

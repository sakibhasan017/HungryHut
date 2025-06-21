import React, { useEffect, useState, useContext } from 'react';
import './TrendingFood.css';
import axios from 'axios';
import { StoreContext } from '../../Context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const TrendingFood = () => {
  const [trending, setTrending] = useState([]);
  const { url } = useContext(StoreContext);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await axios.get(`${url}/api/food/trending`);
        if (response.data.success) {
          setTrending(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch trending foods', error);
      }
    };
    fetchTrending();
  }, [url]);

  return (
    <div className="trending-food" id="trending-food">
      <h2>🔥 Trending Foods</h2>
      <div className="trending-scroll">
        {trending.map((item, index) => (
          <FoodItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} description={item.description} nutrition={item.nutrition} />
        ))}
      </div>
    </div>
  );
};

export default TrendingFood;

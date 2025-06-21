import React, { useContext, useState } from 'react';
import './NutritionSuggest.css';
import axios from 'axios';
import { StoreContext } from '../../Context/StoreContext';
import FoodItem from '../../components/FoodItem/FoodItem';

const NutritionSuggest = () => {
  const { url } = useContext(StoreContext);
  const [goals, setGoals] = useState({
    calories: '',
    protein: '',
    fat: '',
    carbs: '',
  });
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    setGoals({ ...goals, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/api/food/suggest`, goals);
      if (res.data.success) {
        setSuggestions(res.data.data);
      }
    } catch (error) {
      console.error('Suggestion fetch error:', error);
    }
  };

  return (
    <div className="nutrition-suggest">
      <h2>Get Food Suggestions Based on Your Nutrition Needs</h2>
      <form onSubmit={handleSubmit} className="nutrition-form">
        <input type="number" name="calories" placeholder="Calories (kcal)" onChange={handleChange} required />
        <input type="number" name="protein" placeholder="Protein (g)" onChange={handleChange} required />
        <input type="number" name="fat" placeholder="Fat (g)" onChange={handleChange} required />
        <input type="number" name="carbs" placeholder="Carbs (g)" onChange={handleChange} required />
        <button type="submit">Suggest Foods</button>
      </form>

      <div className="suggestion-results">
        {suggestions.length > 0 && (
          <>
            <h3>Suggested Foods:</h3>
            <div className="food-suggestion-list">
              {suggestions.map((food, index) => (
                <FoodItem
                  key={index}
                  id={food._id}
                  name={food.name}
                  image={food.image}
                  price={food.price}
                  description={
                    <>
                      Calories: {food.nutrition?.Calories || '?'} kcal <br />
                      Protein: {food.nutrition?.Protein || '?'} g <br />
                      Fat: {food.nutrition?.Fat || '?'} g <br />
                      Carbs: {food.nutrition?.Carbs || '?'} g
                    </>
                  }
                  nutrition={food.nutrition}
                  disableHover={true}
                  showCartControls={false}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NutritionSuggest;

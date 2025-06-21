import React, { useContext } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';

const FoodItem = ({ id, name, price, description, image, nutrition, disableHover, showCartControls = true }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img className='food-item-image' src={url + "/images/" + image} alt={name} />

        {showCartControls && (!cartItems[id] ? (
          <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="Add" />
        ) : (
          <div className="food-item-counter">
            <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="Remove" />
            <p>{cartItems[id]}</p>
            <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="Add" />
          </div>
        ))}

        {!disableHover && (
  <div className="nutrition-tooltip">
    <h4>Nutrition Info</h4>
    {nutrition && typeof nutrition === 'object' ? (
      <ul>
        {Object.entries(nutrition).map(([key, value]) => {
          let unit = '';
          if (key.toLowerCase() === 'calories') unit = 'kcal';
          else if (['protein', 'fat', 'carbs'].includes(key.toLowerCase())) unit = 'g';

          return (
            <li key={key}>
              <strong>{key}:</strong> {value} {unit}
            </li>
          );
        })}
      </ul>
    ) : (
      <p>No nutrition data.</p>
    )}
  </div>
)}

      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          {showCartControls && <img src={assets.rating_starts} alt="Rating" />}
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">{price} BDT</p>
      </div>
    </div>
  );
};

export default FoodItem;

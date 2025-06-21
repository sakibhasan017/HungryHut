import React, { useContext, useState } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../Context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({category}) => {
    const { food_list } = useContext(StoreContext);
    
    const [searchText, setSearchText] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const filteredList = food_list.filter(item => {

        const matchCategory = category === "All" || category === item.category;

        const matchName = item.name.toLowerCase().includes(searchText.toLowerCase());

        const matchMin = minPrice === "" || item.price >= parseFloat(minPrice);
        const matchMax = maxPrice === "" || item.price <= parseFloat(maxPrice);

        return matchCategory && matchName && matchMin && matchMax;
    });

    return (
        <div className='food-display' id='food-display'>
            <h2>Top dishes near you</h2>

            <div className="search-filter-bar">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                />
            </div>

            <div className="food-display-list">
                {filteredList.map((item, index) => (
                    <FoodItem
                        key={index}
                        id={item._id}
                        name={item.name}
                        price={item.price}
                        description={item.description}
                        image={item.image}
                        nutrition={item.nutrition}
                        
                    />
                ))}
            </div>
        </div>
    );
};

export default FoodDisplay;

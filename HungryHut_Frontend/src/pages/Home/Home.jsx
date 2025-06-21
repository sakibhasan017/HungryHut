import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import TrendingFood from '../../components/TrendingFood/TrendingFood'

const Home = () => {

  const [category,setCategory]=useState("All");

  return (
    <div>
      <Header/>
      <div id="explore-menu">
        <ExploreMenu category={category} setCategory={setCategory} />
      </div>
      <FoodDisplay category={category} />
      <div id="trending-food">
        <TrendingFood />
      </div>
    </div>
  )
}

export default Home
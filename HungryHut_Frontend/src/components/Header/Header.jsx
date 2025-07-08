import React from "react";
import {Link} from 'react-router-dom'
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>
          Explore a rich variety of mouthwatering dishes, made with aromatic
          spices, time-honored recipes, and the heart of homemade cooking. Each
          meal is thoughtfully prepared to bring you joy, comfort, and an
          unforgettable taste. We're here to fulfill your cravings and make
          every dining moment truly special.
        </p>
        <Link to="/#explore-menu"> <button>View Menu</button> </Link>
      </div>
    </div>
  );
};

export default Header;

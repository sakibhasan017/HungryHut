import React from "react";
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
        <a href="#explore-menu"> <button>View Menu</button> </a>
      </div>
    </div>
  );
};

export default Header;

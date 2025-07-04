import React from 'react';
import ReactDOM from 'react-dom/client'
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HashRouter } from "react-router-dom";
import StoreContextProvider from "./Context/StoreContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HashRouter>
    <StoreContextProvider>
      <App />
    </StoreContextProvider>
  </HashRouter>
);

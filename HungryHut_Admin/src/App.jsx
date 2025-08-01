import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sildebar/Sidebar'
import {Routes,Route} from 'react-router-dom'
import Add from './pages/Add/Add.jsx'
import List from './pages/List/List.jsx'
import Orders from './pages/Orders/Orders.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Modify from './pages/Modify/Modify.jsx'
import Verify from './pages/Verify/Verify.jsx'

const App = () => {

  const url = import.meta.env.VITE_API_URL;

  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr />
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path="/add" element={<Add url={url}/>}/>
          <Route path="/list" element={<List url={url}/>}/>
          <Route path="/orders" element={<Orders url={url}/>}/>
          <Route path="/modify/:id" element={<Modify url={url}/>}/>
          <Route path='/verify' element={<Verify url={url}/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
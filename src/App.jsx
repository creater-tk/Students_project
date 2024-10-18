import React from 'react'
import { Routes, Route } from 'react-router-dom'

import HomePage from './Components/HomePage/HomePage'
import NavBar from './Components/NavBar/NavBar'
import Add from './Pages/AddPage/Add'
import Update from './Pages/UpdatePage/Update'
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path='' element={<HomePage/>}/>
        <Route path='/add' element={<Add/>}/>
        <Route path='/update' element={<Update/>}/>
      </Routes>
    </div>
  )
}

export default App

import React from 'react'
import HomePage from './pages/HomePage'
import Register from './auth/Register'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './auth/Login'

const App = () => {
  return (
    // <div><HomePage/></div>
    <div>
      
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
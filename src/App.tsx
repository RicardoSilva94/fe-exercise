import React, { useState } from 'react'
import './App.css'
import Home from './pages/home.tsx'
import LoginPage from './pages/login.tsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App () {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App

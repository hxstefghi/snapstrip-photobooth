import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './components/Landing'
import Photobooth from './pages/Photobooth'
import Customize from './pages/Customize'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/photobooth" element={<Photobooth />} />
        <Route path="/customize" element={<Customize />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

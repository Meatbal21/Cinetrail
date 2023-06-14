import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './components/Header/Header'
import Homepage from './Pages/Homepage/Homepage'
import ThemeContextProvider from './context/ThemeContext'

function App() {
  const apiKey = '102403788fd7e2a7588eff2f615fc0c5'
  const baseURL = 'https://api.themoviedb.org/3'

  return (
    <BrowserRouter>
    <ThemeContextProvider>
    <Header />
      <Routes>
        <Route path='/' element={<Homepage apiKey= {apiKey} baseURl= {baseURL} />} />
    </Routes>
    </ThemeContextProvider>
    </BrowserRouter>
  )
    
}

export default App

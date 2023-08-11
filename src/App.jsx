import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './components/Header/Header'
import Homepage from './Pages/Homepage/Homepage'
import ThemeContextProvider from './context/ThemeContext'
import MovieDetails from './Pages/MovieDetails/MovieDetails'

function App() {
const apiKey = import.meta.env.VITE_API_KEY;
const baseUrl = import.meta.env.VITE_BASE_URL;

  return (
    <BrowserRouter>
    <ThemeContextProvider>
    <Header />
      <Routes>
        <Route path='/' element={<Homepage apiKey={apiKey} baseUrl={baseUrl} />} />
        <Route path='/moviedetails/:movieid' element={<MovieDetails baseUrl={baseUrl} apiKey={apiKey}/>} />
    </Routes>
    </ThemeContextProvider>
    </BrowserRouter>
  )
    
}

export default App

import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './components/Header/Header'
import Homepage from './Pages/Homepage/Homepage'
import MovieDetails from './Pages/MovieDetails/MovieDetails'
import CombinedContextProvider from './context/index'
import SignUp from './Pages/SignUp/SignUp'
import SignIn from './Pages/SignIn/SignIn'

function App() {
const apiKey = import.meta.env.VITE_API_KEY;
const baseUrl = import.meta.env.VITE_BASE_URL;
const serverUrl = import.meta.env.VITE_SERVER_URL;

  return (
    <BrowserRouter>
    <CombinedContextProvider>
    <Header apiKey={apiKey} baseUrl={baseUrl}/>
      <Routes>
        <Route path='/' element={<Homepage apiKey={apiKey} baseUrl={baseUrl} />} />
        <Route path='/moviedetails/:movieid' element={<MovieDetails baseUrl={baseUrl} apiKey={apiKey} serverUrl={serverUrl}/>} />
        <Route path='/signup' element={<SignUp serverUrl={serverUrl}/>} />
        <Route path='/signin' element={<SignIn serverUrl={serverUrl}/>} />
    </Routes>
    </CombinedContextProvider>
    </BrowserRouter>
  )
    
}

export default App

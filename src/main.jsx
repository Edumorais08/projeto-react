import { StrictMode } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from 'react-dom/client'

import './index.css'

import App from './App.jsx'
import Home from './pages/Home.jsx';
import Movie from './pages/Movie.jsx';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path='/' element={<Home />} />
          <Route path='movie/:id' element={<Movie />} />
        </Route>
      </Routes>
    </BrowserRouter> 
  </StrictMode>
);

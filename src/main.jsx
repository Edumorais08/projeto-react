import { StrictMode } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from 'react-dom/client';

import './index.css';

import App from './App.jsx';
import Home from './pages/Home/Home.jsx';
import Movie from './pages/Movie/Movie.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Favorites from "./pages/Favoritos/Favoritos.jsx";
import { FavoriteProvider } from './context/FavoriteContext'; 
import EditProfile from './pages/EditProfile.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FavoriteProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<App />}>
            <Route path='/' element={<Home />} />
            <Route path='/movie/:id' element={<Movie />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/favorites' element={<Favorites />} />
            <Route path='/EditProfile' element={<EditProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </FavoriteProvider>
  </StrictMode>
);

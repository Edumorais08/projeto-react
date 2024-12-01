import { StrictMode } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from 'react-dom/client';

import './index.css';

import App from './App.jsx';
import Home from './pages/Home/Home.jsx';
import Movie from './pages/Movie/Movie.jsx';
import UserManager from "./pages/UserPage.jsx";
// import Favorites from "./pages/Favorites/Favorties.jsx";
import { FavoriteProvider } from './context/FavoriteContext'; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FavoriteProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<App />}>
            <Route path='/' element={<Home />} />
            <Route path='/movie/:id' element={<Movie />} />
            <Route path='/login' element={<UserManager />} />
            {/* <Route path='/favorites' element={<Favorites />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </FavoriteProvider>
  </StrictMode>
);

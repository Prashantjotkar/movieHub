import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import { Route, Routes, useLocation } from "react-router-dom";
import MovieDetail from "./components/MovieDetail";
import Movies from "./components/Movies";
import TvShows from "./components/TvShows";
import SavedMovies from "./components/SavedMovies";
import React, { useState } from "react";
import { MovieProvider } from './MovieContext';

function App() {

  return (
    <>
        <MovieProvider>

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/movies/:id" element={<MovieDetail />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tvshows" element={<TvShows />} />
        <Route
          path="/saved-movies"
          element={<SavedMovies/>}
        />
      </Routes>
      </MovieProvider>

    </>
  );
}

export default App;

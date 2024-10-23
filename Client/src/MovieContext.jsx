import React, { createContext, useState, useContext } from 'react';

// Create a context
const MovieContext = createContext();

// Create a provider component
export const MovieProvider = ({ children }) => {
  const [savedMovies, setSavedMovies] = useState([]);
  const handleSaveMovie = (movie) => {
    setSavedMovies((prev) => {
      const isSaved = prev.find((m) => m.imdbID === movie.imdbID);
      if (isSaved) {
        return prev.filter((m) => m.imdbID !== movie.imdbID);
      } else {
        return [...prev, movie];
      }
    });
  };

  return (
    <MovieContext.Provider value={{ savedMovies, setSavedMovies ,handleSaveMovie}}>
      {children}
    </MovieContext.Provider>
  );
};

// Create a custom hook for easy access to the context
export const useMovies = () => {
  return useContext(MovieContext);
};

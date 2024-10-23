import MovieCard from "./MovieCard";
import NavBar from "./NavBar";
import { useState } from "react";
export default function Home() {
  const [savedMovies, setSavedMovies] = useState([]); // Initialize state here

  return (
    <>
      <div
        style={{
          display: "flex",
          backgroundColor: "#263238",
          top: 0,
          position: "fixed",
        }}
      >
        <NavBar />
        <div className="scrollable-child">
          <MovieCard savedMovies={savedMovies} setSavedMovies={setSavedMovies}  />
        </div>
      </div>
    </>
  );
}

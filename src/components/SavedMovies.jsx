import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
} from "@mui/material";
import { Grid } from "@material-ui/core";
import NavBar from "./NavBar";
import React, { useState } from "react";

import SearchBar from "./SearchBar";
import { useMovies } from "../MovieContext"; // Import the custom hook
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
const SavedMovies = () => {
  const { savedMovies, setSavedMovies } = useMovies(); // Use the hook
  const [hoveredMovieId, setHoveredMovieId] = useState(null); // New state for hover
  const handleRemoveMovie = (movie) => {
    setSavedMovies((prev) => prev.filter((m) => m.imdbID !== movie.imdbID));
  };

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#263238",
        top: 0,
        position: "fixed",
        width: "100%",
      }}
    >
      <Box
        sx={{
          marginLeft: 9,
          marginBottom: 5,
          marginTop: 5,
          backgroundColor: "#263238",
          height: "calc(100vh - 20px)",
          overflowY: "auto",
          padding: "10px",
          width: "100%",
        }}
      >
        <NavBar />
        <SearchBar />
        <Typography
          variant="h5"
          color="white"
          sx={{ marginLeft: "100px", marginTop: "2px" }}
        >
          My Saved Shows
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {savedMovies.length === 0 ? (
            <Typography variant="body1" color="white">
              No saved movies found.
            </Typography>
          ) : (
            savedMovies.map((movie) => (
              <Grid item key={movie.imdbID}>
                <Link
                  to={`/movies/${movie.imdbID}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card
                    sx={{
                      margin: 2,
                      width: "300px",
                      height: "250px",
                      backgroundColor: "#263238",
                      overflow: "hidden",
                      transition: "transform 0.3s",
                      "&:hover": { transform: "scale(1.05)" },
                    }}
                    onMouseEnter={() => setHoveredMovieId(movie.imdbID)} // Set hover state
                    onMouseLeave={() => setHoveredMovieId(null)} // Clear hover state
                  >
                    <CardMedia
                      component="img"
                      height="210"
                      image={
                        movie.Poster !== "N/A" ? movie.Poster : "movies.jpeg"
                      }
                      alt={movie.Title}
                      sx={{ objectFit: "cover" }}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="body2"
                        component="div"
                        color="white"
                      >
                        {movie.Title}
                      </Typography>
                    </CardContent>
                    <IconButton
                    onClick={(e) => {
                      e.preventDefault(); // Prevent navigation
                      handleRemoveMovie(movie);
                    }}
                    sx={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      color: "black",
                      backgroundColor: "transparent",
                      display:
                        hoveredMovieId === movie.imdbID ? "block" : "none",

                      "&:hover": { backgroundColor: "transparent" },
                      "&:focus": { outline: "none" },
                    }}
                    disableRipple
                  >
                    <CloseIcon />
                  </IconButton>
                  </Card>
                 
                </Link>
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </div>
  );
};

export default SavedMovies;

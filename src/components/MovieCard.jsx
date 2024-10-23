import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { Grid } from "@material-ui/core";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { useMovies } from "../MovieContext"; // Import the custom hook

const MovieCard = () => {
  const { savedMovies, setSavedMovies,handleSaveMovie } = useMovies(); // Use the hook
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hoveredMovieId, setHoveredMovieId] = useState(null); // New state for hover

  const apiKey = "37bc65b8";
  const totalResults = 100;

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const allMovies = [];

      for (let page = 1; page <= totalResults; page++) {
        try {
          const url = `https://www.omdbapi.com/?s=movie&y=2024&page=${page}&apikey=${apiKey}`;
          const response = await axios.get(url);
          if (response.data.Response === "True") {
            const validMovies = response.data.Search.filter(
              (movie) => movie.Poster !== "N/A"
            );
            allMovies.push(...validMovies);
          } else {
            setError(response.data.Error);
            break;
          }
        } catch (err) {
          setError("Error fetching data");
          break;
        }
      }

      setMovies(allMovies);
      setLoading(false);
    };

    fetchMovies();
  }, []);


  return (
    <Box sx={{ marginTop: 5, marginLeft: 14, marginBottom: 5 }}>
      <SearchBar />
      <Typography variant="h5" component="div" color="white" sx={{ marginLeft: "15px", marginTop: "2px" }}>
        Trending
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2} justifyContent="center">
          {movies.map((movie) => (
            <Grid item key={movie.imdbID}>
              <Link to={`/movies/${movie.imdbID}`} style={{ textDecoration: "none" }}>
                <Card
                  sx={{
                    margin: 2,
                    width: "300px",
                    height: "250px",
                    backgroundColor: "#263238",
                    overflow: "hidden",
                    transition: "transform 0.3s",
                    "&:hover": { transform: "scale(1.05)" },
                    position: "relative",
                  }}
                  onMouseEnter={() => setHoveredMovieId(movie.imdbID)} // Set hover state
                  onMouseLeave={() => setHoveredMovieId(null)} // Clear hover state
                >
                  <CardMedia
                    component="img"
                    height="210"
                    image={movie.Poster !== "N/A" ? movie.Poster : "movies.jpeg"}
                    alt={movie.Title}
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="body2" component="div" color="white">
                      {movie.Title}
                    </Typography>
                  </CardContent>
                  <IconButton
                    onClick={(e) => {
                      e.preventDefault(); // Prevent navigation
                      handleSaveMovie(movie);
                    }}
                    sx={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      color: savedMovies.find((m) => m.imdbID === movie.imdbID) ? "yellow" : "black",
                      backgroundColor: "transparent",
                      display: hoveredMovieId === movie.imdbID ? "block" : "none", 
                      "&:hover": { backgroundColor: "transparent" },
                      "&:focus": { outline: "none" },
                    }}
                    disableRipple
                  >
                    {savedMovies.find((m) => m.imdbID === movie.imdbID) ? <StarIcon /> : <StarBorderIcon />}
                  </IconButton>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default MovieCard;

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { Grid } from "@material-ui/core";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import { useMovies } from "../MovieContext";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
const TvShows = () => {
  const { savedMovies, setSavedMovies ,handleSaveMovie} = useMovies(); // Use the hook
  const [hoveredMovieId, setHoveredMovieId] = useState(null); // New state for hover

  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const apiKey = "37bc65b8"; // Replace with your actual API key
  const resultsPerPage = 10; // Number of results to fetch per page
  const totalResults = 100;
  const years = [2023, 2024]; // Years to fetch movies from

  useEffect(() => {
    const fetchMovies = async () => {
      const allMovies = [];

      for (const year of years) {

        const totalPages = Math.ceil(totalResults / resultsPerPage);

        for (let page = 1; page <= totalPages; page++) {
          try {
            const url=`https://www.omdbapi.com/?s=series&y=${year}&page=${page}&apikey=${apiKey}`

            const response = await axios.get(url);
            if (response.data.Response === "True") {
              allMovies.push(...response.data.Search);
            } else {
              setError(response.data.Error);
              break;
            }
          } catch (err) {
            setError("Error fetching data");
            break;
          }
        }
      }

      setMovies(allMovies);
    };

    fetchMovies();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#263238",
        top: 0,
        position: "fixed",
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
        }}
      >
        <NavBar />

        <SearchBar />
        <Typography
          variant="h5"
          component="div"
          color="white"
          sx={{ marginLeft: "15px", marginTop: "2px" }}
        >
          Explore Tv Shows
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          {movies.map((movie) => (
            <Grid item key={movie.imdbID}>
              <Link
                to={`/movies/${movie.imdbID}`}
                key={movie.imdbID}
                style={{ textDecoration: "none" }}
              >
                <Card
                  sx={{
                    margin: 2,
                    width: "300px",
                    height: "250px",
                    backgroundColor: "#263238",
                    overFlow: "hidden",
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
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
                    sx={{
                      objectFit: "cover", // Ensure the image covers the area
                    }}
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
      </Box>
    </div>
  );
};

export default TvShows;



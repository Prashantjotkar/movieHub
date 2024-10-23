import React, { useState } from "react";
import {
  Toolbar,
  TextField,
  InputAdornment,
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import StarIcon from "@mui/icons-material/Star";
import { useMovies } from "../MovieContext";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Import the arrow icon

export default function SearchBar() {
  const { savedMovies, handleSaveMovie } = useMovies(); // Use the hook

  const [hoveredMovieId, setHoveredMovieId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const apiKey = "37bc65b8";

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value) {
      fetchMovies(value);
    } else {
      setMovies([]);
      setSelectedMovie(null);
    }
  };

  const fetchMovies = async (term) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${term}&apikey=${apiKey}`
      );
      const data = await response.json();
      if (data.Response === "True") {
        setMovies(data.Search.slice(0, 3));
      } else {
        setMovies([]);
        setError(data.Error);
      }
    } catch (err) {
      setError("Failed to fetch movies");
    } finally {
      setLoading(false);
    }
  };

  const fetchMovieDetails = async (id) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`
      );
      const data = await response.json();
      if (data.Response === "True") {
        setSelectedMovie(data);
      } else {
        setError(data.Error);
      }
    } catch (err) {
      setError("Failed to fetch movie details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Toolbar>
        <TextField
          variant="outlined"
          placeholder="Search Movies..."
          size="large"
          color="primary"
          sx={{ flexGrow: 1, backgroundColor: "#37474f" }}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="large" />
              </InputAdornment>
            ),
            sx: {
              "& .MuiInputBase-input": {
                color: "rgba(255, 255, 255, 0.7)",
              },
              "& .MuiInputBase-input::placeholder": {
                fontSize: "1.5rem",
                color: "rgba(255, 255, 255, 0.7)",
              },
            },
          }}
          value={searchTerm}
          onChange={handleChange}
          aria-label="Search Movies"
        />
      </Toolbar>
      <Box sx={{ marginTop: 2 }}>
        {loading && <CircularProgress />}
        {error && (
          <Typography variant="body2" color="error" sx={{ padding: 2 }}>
            {error}
          </Typography>
        )}
        <List>
          {movies.map((movie) => (
            <ListItem
              key={movie.imdbID}
              onClick={() => fetchMovieDetails(movie.imdbID)}
            >
              <ListItemText
                primary={movie.Title}
                secondary={movie.Year}
                primaryTypographyProps={{ style: { color: "white" } }}
                secondaryTypographyProps={{ style: { color: "white" } }}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      {selectedMovie && (
        <Box sx={{ marginTop: 4 }}>
          <Link
            to={`/movies/${selectedMovie.imdbID}`}
            style={{ textDecoration: "none" }}
          >
            <Card
              sx={{
                margin: 2,
                width: "300px",
                height: "270px",
                backgroundColor: "#263238",
                overflow: "hidden",
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.05)" },
                position: "relative",
              }}
              onMouseEnter={() => setHoveredMovieId(selectedMovie.imdbID)} // Set hover state
              onMouseLeave={() => setHoveredMovieId(null)} // Clear hover state
            >
              <CardMedia
                component="img"
                height="210"
                image={
                  selectedMovie.Poster !== "N/A"
                    ? selectedMovie.Poster
                    : "movies.jpeg"
                }
                alt={selectedMovie.Title}
                sx={{ objectFit: "cover" }}
              />
              <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography gutterBottom variant="body2" component="div" color="white">
                    {selectedMovie.Title}
                  </Typography>
                  <IconButton
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedMovie(null);
                    }}
                    sx={{ marginLeft: 2,


                      "&:hover": {
                        backgroundColor: "red",
                      },
      
                     }}
                  >
                    <ArrowBackIcon style={{ color: "white" }} />
                  </IconButton>
                </Box>
              </CardContent>
              <IconButton
                onClick={(e) => {
                  e.preventDefault(); // Prevent navigation
                  handleSaveMovie(selectedMovie);
                }}
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  color: savedMovies.find(
                    (m) => m.imdbID === selectedMovie.imdbID
                  )
                    ? "yellow"
                    : "black",
                  backgroundColor: "transparent",
                  display:
                    hoveredMovieId === selectedMovie.imdbID ? "block" : "none",
                  "&:hover": { backgroundColor: "transparent" },
                  "&:focus": { outline: "none" },
                }}
                disableRipple
              >
                {savedMovies.find((m) => m.imdbID === selectedMovie.imdbID) ? (
                  <StarIcon />
                ) : (
                  <StarBorderIcon />
                )}
              </IconButton>
            </Card>
          </Link>
        </Box>
      )}
    </Box>
  );
}

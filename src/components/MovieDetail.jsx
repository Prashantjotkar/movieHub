import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Rating,
} from "@mui/material";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const apiKey = "37bc65b8";

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`
        );
        if (response.data.Response === "True") {
          setMovie(response.data);
        } else {
          console.error(response.data.Error);
        }
      } catch (err) {
        console.error("Error fetching movie detail", err);
      } 
    };

    fetchMovieDetail();
  }, [id]);



  if (!movie) {
    return <Typography variant="h6">Movie not found</Typography>;
  }

  return (
    <>
      <Box
        sx={{
          width: "100vw", // Full width
          height: "100vh", // Full height
          backgroundColor: "#263238", // Example background color
          display: "flex",
          alignItems: "center", // Center content vertically
          justifyContent: "center", // Center content horizontally
          fontSize: "2rem", // Font size
        }}
      >
        <NavBar />

        <Box
          sx={{
            marginLeft: "100px",
            marginRight: "15px",

          }}
        >
          {" "}
          <Card sx={{ display: "flex", flexDirection: "row" ,border:"2px solid white"}}>
            <CardMedia
              component="img"
              alt={movie.Title}
              height="500"
              width="50"
              image={movie.Poster !== "N/A" ? movie.Poster : "movies.jpeg"}
            />
            <CardContent
              sx={{
                backgroundColor: "#263238",
                color: "white",
              }}
            >
              <Typography
                variant="h4"
                sx={{ fontWeight: "bold", marginBottom: 2 }}
              >
                {movie.Title}
              </Typography>
              <Typography>Ratings</Typography>

              <Box sx={{ display: "flex", alignItems: "center", marginTop: 1 }}>
                <Typography variant="varient3">{movie.imdbRating}</Typography>

                <Rating
                  name="imdb-rating"
                  value={Number(movie.imdbRating) / 2}
                  precision={0.5}
                  readOnly
                />
              </Box>

              <Typography sx={{ marginBottom: 2 }}>
                Year: {movie.Year}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                Director: {movie.Director}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                Actors: {movie.Actors}
              </Typography>
              <Typography
                variant="body1"
                sx={{ marginBottom: 1, font: "bold" }}
              >
                Genre
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  display: "inline-block",
                  padding: "10px 20px",
                  backgroundColor: "white", // Primary color
                  color: "black",
                  borderRadius: "4px",
                  textAlign: "center",
                }}
              >
                {movie.Genre}
              </Typography>

              <Typography sx={{ marginBottom: 2, marginTop: 1 }}>
                Plot: {movie.Plot}
              </Typography>
              <Typography sx={{ marginTop: 1 }}>
                Website: {movie.Website}
              </Typography>

            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default MovieDetail;

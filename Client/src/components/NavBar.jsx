import React from "react";
import { Box, Drawer, IconButton, Link } from "@mui/material";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import HomeIcon from "@mui/icons-material/Home";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  return (
    <Drawer variant="permanent" anchor="left">
      <Box
        sx={{
          width: "10vh",
          bgcolor: "#90a4ae",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "20px",
          height: "100vh", // Full height
          varient: "permanent",
        }}
      >
        <Box
          sx={{
            backgroundColor: "red",
            borderRadius: "50%",
            padding: "5px",
            display: "inline-flex",
            alignItems: "center",

            justifyContent: "center",
          }}
        >
          <LocalMoviesIcon fontSize="large" />
        </Box>

        <Tooltip title="Home" placement="bottom">
          <IconButton
            onClick={() => navigate("/home")}
            color="inherit"
            aria-label="about"
            sx={{ marginTop: "60px" }}
          >
            <HomeIcon fontSize="medium" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Movies" placement="bottom">
          <IconButton
            color="inherit"
            aria-label="help"
            sx={{ marginTop: "30px" }}
            onClick={() => navigate("/movies")}
          >
            <MovieFilterIcon fontSize="medium" />
          </IconButton>
        </Tooltip>

        <Tooltip title="TV Shows" placement="bottom">
          <IconButton
            color="inherit"
            aria-label="settings"
            sx={{ marginTop: "30px" }}
            onClick={() => navigate("/tvshows")}
          >
            <LiveTvIcon fontSize="medium" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Saved" placement="bottom">
          <IconButton
            color="inherit"
            aria-label="contact"
            sx={{ marginTop: "30px" }}
            onClick={() => navigate("/saved-movies")}

          >
            <BookmarkIcon fontSize="medium" />
          </IconButton>
        </Tooltip>

        <Link href="/">
          <Tooltip title="Signup" placement="bottom">
            <IconButton
              sx={{
                marginTop: "220px",
                color: "black",

                "&:hover": {
                  backgroundColor: "red",
                },
              }}
            >
              <PersonAddIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        </Link>
      </Box>
    </Drawer>
  );
}

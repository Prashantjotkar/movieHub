import React, { useState } from "react";
import { TextField, Button, Paper, Typography, Box, Link } from "@mui/material";
import { Grid, Avatar } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import NavBar from "./NavBar";
const Login = () => {
  const [isLogin, setIsLogin] = useState(true); // Default to login mode
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const getInputData = async (e) => {
    e.preventDefault();
    const API_END_POINT = "http://localhost:3001/user";
    if (isLogin) {
      // Login
      const user = { email, password };
      try {
        const res = await axios.post(`${API_END_POINT}/login`, user, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        if (res.data.success) {
          toast.success(res.data.message);
          navigate("/home"); // Navigate to home page after successful login
        }
      } catch (error) {
        if (error.response && error.response.data) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An unexpected error occurred.");
        }
        console.log(error);
      }
    } else {
      // Register
      const user = { fullName, email, password };
      try {
        const res = await axios.post(`${API_END_POINT}/register`, user, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        if (res.data.success) {
          toast.success(res.data.message);
          setIsLogin(true); 
        
        }
      } catch (error) {
        if (error.response && error.response.data) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An unexpected error occurred.");
        }
        console.log(error);
      }
    }

    // Reset form fields after submission
    setFullName("");
    setEmail("");
    setPassword("");
  };

  const paperStyle = {
    padding: 20,
    width: 400,
    margin: "160px auto",
    backgroundColor: "#607d8b",
  };
  const avatarStyle = { backgroundColor: "#1769aa" };
  const btnstyle = { margin: "8px 0" };
  
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#263238"
    >
      <NavBar />
<Toaster/>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}></Avatar>
        </Grid>
        <Typography
          variant="h4"
          align="center"
          sx={{ fontWeight: "bold", color: "white" }}
          gutterBottom
        >
          {isLogin ? "Login" : "Register"}
        </Typography>

        {!isLogin && (
          <TextField
            label="Full Name"
            placeholder="Enter Full Name"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        )}
        <TextField
          label="Email Address"
          placeholder="Enter Email"
          variant="outlined"
          fullWidth
          required
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          placeholder="Enter Password"
          type="password"
          variant="outlined"
          fullWidth
          required
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={btnstyle}
          fullWidth
          onClick={getInputData}
        >
          {isLogin ? "Log In" : "Sign Up"}
        </Button>
        <Typography>
          <Link href="#" sx={{ color: "#29b6f6", textDecoration: "none" }}>
            {isLogin ? "Forgot password?" : ""}

          </Link>
        </Typography>
        <Typography align="center">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <br />
          <Link
            href="#"
            onClick={() => setIsLogin(!isLogin)} // Toggle between login and register
            sx={{
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
              color: "#29b6f6",
            }}
          >
            {isLogin ? "Sign Up" : "Log In"}
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;

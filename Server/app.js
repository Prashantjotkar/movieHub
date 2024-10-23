import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./mongoDB/connectMongo.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoutes.js";
import cors from "cors";


// Load environment variables from .env file
dotenv.config({
    path: "./.env"
});

// Connect to the database
databaseConnection();

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: true,
    credentials: true
};
app.use(cors(corsOptions));

// API routes
app.use("/user", userRoute);

// Use port from environment variable or default to 3000
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server listen at port ${port}`);
});
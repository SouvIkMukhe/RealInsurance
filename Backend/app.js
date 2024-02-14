import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import insuranceRouter from "./routes/insuranceRoutes.js";
import userRouter from "./routes/userRoutes.js";
import applicationRouter from "./routes/applicationRoutes.js";
import { config } from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

// Create an instance of the Express application
const app = express();

// Load environment variables from config.env file
config({ path: "./config/config.env" });

// Enable Cross-Origin Resource Sharing (CORS)
app.use(
  cors({
    origin: [process.env.FRONTEND_URL], // Allow requests from specified origins
    method: ["GET", "POST", "DELETE", "PUT"], // Allow specified HTTP methods
    credentials: true, // Allow credentials (cookies, HTTP authentication) to be sent with requests
  })
);

// Parse cookies in incoming requests
app.use(cookieParser());

// Parse JSON-encoded and URL-encoded data in incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable file upload functionality
app.use(
  fileUpload({
    useTempFiles: true, // Use temporary files for file uploads
    tempFileDir: "/tmp/", // Temporary file directory
  })
);

// Set up routes for user, insurance, and application handling
app.use("/api/v1/user", userRouter);
app.use("/api/v1/insurance", insuranceRouter);
app.use("/api/v1/application", applicationRouter);

// Establish a connection to the MongoDB database
dbConnection();

// Middleware to handle errors and send appropriate responses
app.use(errorMiddleware);

// Export the configured Express application for use in other modules
export default app;

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
config({ path: "./config/config.env" });

// Configure CORS for specified origins and methods
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

// Parse cookies and request bodies
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure file upload middleware
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Mount user routes
app.use("/api/v1/user", userRouter);

// Mount insurance routes
app.use("/api/v1/insurance", insuranceRouter);

// Mount application routes
app.use("/api/v1/application", applicationRouter);

// Establish a connection to the database
dbConnection();

// Use custom error handling middleware
app.use(errorMiddleware);

// Export the Express application for use in other parts of the application
export default app;

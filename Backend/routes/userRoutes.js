import express from "express";
import { login, register, logout, getUser } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

// Create an instance of the Express router
const router = express.Router();

// Route to handle user registration
router.post("/register", register);

// Route to handle user login
router.post("/login", login);

// Route to handle user logout (requires authentication)
router.get("/logout", isAuthenticated, logout);

// Route to get user details (requires authentication)
router.get("/getuser", isAuthenticated, getUser);

// Export the configured router for use in the main application
export default router;

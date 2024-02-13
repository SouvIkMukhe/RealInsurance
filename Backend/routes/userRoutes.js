import express from "express";
import { login, register, logout, getUser } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

// Create an instance of the Express Router
const router = express.Router();

// Route to handle user registration
router.post("/register", register);

// Route to handle user login
router.post("/login", login);

// Route to handle user logout (requires authentication)
router.get("/logout", isAuthenticated, logout);

// Route to get details of the authenticated user
router.get("/getuser", isAuthenticated, getUser);

// Export the router for use in other parts of the application
export default router;

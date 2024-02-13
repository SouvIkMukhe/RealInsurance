// Import necessary modules and files
import express from "express";
import {
  deleteInsurance,
  getAllInsurances,
  getMyInsurances,
  getSingleInsurance,
  postInsurance,
  updateInsurance,
} from "../controllers/insuranceController.js";
import { isAuthenticated } from "../middlewares/auth.js";

// Create an Express router
const router = express.Router();

// Route to get all insurances
router.get("/getall", getAllInsurances);

// Route to post a new insurance (requires authentication)
router.post("/post", isAuthenticated, postInsurance);

// Route to get insurances posted by the logged-in user (requires authentication)
router.get("/getmyinsurances", isAuthenticated, getMyInsurances);

// Route to update insurance details (requires authentication)
router.put("/update/:id", isAuthenticated, updateInsurance);

// Route to delete an insurance (requires authentication)
router.delete("/delete/:id", isAuthenticated, deleteInsurance);

// Route to get details of a specific insurance (requires authentication)
router.get("/:id", isAuthenticated, getSingleInsurance);

// Export the router for use in other files
export default router;

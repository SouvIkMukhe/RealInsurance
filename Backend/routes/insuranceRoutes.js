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

// Create an instance of the Express router
const router = express.Router();

// Route to handle the retrieval of all insurances
router.get("/getall", getAllInsurances);

// Route to handle the posting of a new insurance
router.post("/post", isAuthenticated, postInsurance);

// Route to handle the retrieval of insurances posted by the authenticated user
router.get("/getmyinsurances", isAuthenticated, getMyInsurances);

// Route to handle the update of an existing insurance
router.put("/update/:id", isAuthenticated, updateInsurance);

// Route to handle the deletion of an existing insurance
router.delete("/delete/:id", isAuthenticated, deleteInsurance);

// Route to handle the retrieval of a single insurance by ID
router.get("/:id", isAuthenticated, getSingleInsurance);

// Export the configured router for use in the main application
export default router;

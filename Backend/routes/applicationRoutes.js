import express from "express";
import {
  adminGetAllApplications,
  insuranceseekerDeleteApplication,
  insuranceseekerGetAllApplications,
  postApplication,
} from "../controllers/applicationController.js";
import { isAuthenticated } from "../middlewares/auth.js";

// Create an instance of the Express router
const router = express.Router();

// Route to handle the posting of a new application
router.post("/post", isAuthenticated, postApplication);

// Route to handle the retrieval of all applications by an admin
router.get("/admin/getall", isAuthenticated, adminGetAllApplications);

// Route to handle the retrieval of all applications by an insurance seeker
router.get("/insuranceseeker/getall", isAuthenticated, insuranceseekerGetAllApplications);

// Route to handle the deletion of an application by an insurance seeker
router.delete("/delete/:id", isAuthenticated, insuranceseekerDeleteApplication);

// Export the configured router for use in the main application
export default router;

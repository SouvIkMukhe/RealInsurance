// routes/applicationRoutes.js

import express from "express";
import {
  postApplication,
  adminGetAllApplications,
  insuranceseekerGetAllApplications,
  insuranceseekerDeleteApplication,
  getApplicationDetails,
  adminDecisionInsurance, // Correct function name
} from "../controllers/applicationController.js"; // Correct path

import { isAuthenticated, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

// Route to handle posting a new application
router.post("/post", isAuthenticated, postApplication);

// Route to handle getting all applications for an admin
router.get("/admin/getall", isAuthenticated, isAdmin, adminGetAllApplications);

// Route to handle getting all applications for an insurance seeker
router.get("/insuranceseeker/getall", isAuthenticated, insuranceseekerGetAllApplications);

// Route to handle deleting an application for an insurance seeker
router.delete("/insuranceseeker/delete/:id", isAuthenticated, insuranceseekerDeleteApplication);

// Route to handle getting details of a specific application
router.get("/details/:id", isAuthenticated, getApplicationDetails);

// Corrected route to handle admin decision on an application
/*router.patch("/admin/decision/:id", isAuthenticated, isAdmin, adminDecisionInsurance);*/

export default router;

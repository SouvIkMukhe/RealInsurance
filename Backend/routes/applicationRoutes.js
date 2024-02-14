import express from "express";
import {
  adminGetAllApplications,
  insuranceseekerDeleteApplication,
  insuranceseekerGetAllApplications,
  postApplication,
} from "../controllers/applicationController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/post", isAuthenticated, postApplication);
router.get("/admin/getall", isAuthenticated, adminGetAllApplications);
router.get("/insuranceseeker/getall", isAuthenticated, insuranceseekerGetAllApplications);
router.delete("/delete/:id", isAuthenticated, insuranceseekerDeleteApplication);

export default router;

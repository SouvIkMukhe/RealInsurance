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

const router = express.Router();

router.get("/getall", getAllInsurances);
router.post("/post", isAuthenticated, postInsurance);
router.get("/getmyinsurances", isAuthenticated, getMyInsurances);
router.put("/update/:id", isAuthenticated, updateInsurance);
router.delete("/delete/:id", isAuthenticated, deleteInsurance);
router.get("/:id", isAuthenticated, getSingleInsurance);

export default router;

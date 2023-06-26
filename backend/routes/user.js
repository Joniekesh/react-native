import express from "express";
import { getProfile } from "../controllers/user.js";
import { protect } from "../middlewares/auth.js";
const router = express.Router();

router.get("/me", protect, getProfile);

export default router;

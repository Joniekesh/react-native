import express from "express";
const router = express.Router();
import {
	register,
	login,
	forgotPassword,
	resetPassword,
} from "../controllers/auth.js";

router.post("/", register);
router.post("/login", login);
router.post("/:forgotpassword", forgotPassword);
router.put("/:resetpassword", resetPassword);

export default router;

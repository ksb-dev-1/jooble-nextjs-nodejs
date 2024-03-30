import express from "express";
const router = express.Router();

import { authenticateUser } from "../middlewares/authentication.js";
import {
  registerUser,
  verifyEmail,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";

router.post("/register", registerUser);
router.post("/verify-email", verifyEmail);
router.post("/login", loginUser);
//router.delete("/logout", authenticateUser, logoutUser);
router.delete("/logout", logoutUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;

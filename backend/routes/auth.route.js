import express from "express";
const router = express.Router();
import { login, logout, signup } from "../controllers/auth.controller.js";

router.get("/login", login);
router.get("/logout", logout);
router.post("/signup", signup);

export default router;

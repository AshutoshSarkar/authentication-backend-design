import { login, signup } from "../Controllers/auth.js";
import express from "express";

const router = express.Router();

router.get("/login", login);
router.post("/signup", signup);

export default router;

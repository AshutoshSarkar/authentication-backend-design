import { signup } from "../Controllers/auth.js";
import { login } from "../Controllers/auth.js";
import express from "express";

import { auth, isStudent, isAdmin } from "../Middlewares/middlewares.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);

//testing protected Route
router.get("/test", auth, (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome to the protectd Route for tests",
    });
  });

//protected route for students
router.get("/student", auth, isStudent, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the protected Route for students",
  });
});

//admin protected for admin
router.get("/admin", auth, isAdmin, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the protected Route for Admin",
  });
});

export default router;

import { signup } from "../Controllers/auth.js";
import { login } from "../Controllers/auth.js";
import express from "express";
import User from '../Models/userModel.js';

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

router.get("/getUser", auth, async (req,res)=>{
  try{
    const id = req.user.id;
    console.log("id",id);

    const user = await User.findById(id);

    res.status(200).json({
      success:true,
      data:user,
      message:"getting all the user successfully"
    })

  }
  catch(error){
    res.status(500).json({
      success:false,
      message:"Internal Server Error",
    })
  };
})

export default router;

import User from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

export const signup = async (req, res) => {
  try {
    //feching the data from req body
    const { name, email, password, role } = req.body;

    //ask database that user is present or not
    const existingUser = await User.findOne({ email });

    //if user is present
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exist please log in",
      });
    }

    // now hashing the password
    let hashedPassword;

    try {
      hashedPassword = await bcrypt.hash(password, 10);
      //creating new user
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
      })
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
        message: "cant signup please try again",
      });
    }
    //send the response
    return res.status(201).json({
      success: true,
      message: "signed up successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "cant signup please try again",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    //fetching the data from req body
    const { email, password } = req.body;

    // if some field is missing
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "please fill all the fields",
      });
    }

    //if user is not present
    //use let when defining the user because we will update the user object later
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not found please signup",
      });
    }

    const payload = {
      email: user.email,
      role: user.role,
      id: user._id,
    };
    //verify password and generate JWT Token
    const isValid = await bcrypt.compare(password, user.password);
    //password is valid
    if (isValid) {
      //generate JWT Token
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      //convert the user to object
      user= user.toObject();

      //add token to user object in database
      user.token = token;

      //remove password from user object
      user.password = undefined;

      //creating options
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      //generating cookie
      res.cookie("token", token, options).json({
        success: true,
        message: "login Successfully",
        token: token,
        user: user,
      });
    }
    //password is invalid
    else {
      return res.status(403).json({
        success: false,
        message: "Invalid password",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "cant login please try again",
      error: error.message,
    });
  }
};
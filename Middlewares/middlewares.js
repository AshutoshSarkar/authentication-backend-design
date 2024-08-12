import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

export const auth = async (req, res, next) => {
  try {
    // Fetching the data from the req body
    const token = req.body.token;

    // Checking if the token is present or not
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is required",
      });
    }

    // Verifying the token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode);

      req.user = decode;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid Token",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// isStudent middleware
export const isStudent = async (req, res, next) => {
  try {
    if (req.user.role !== "Student") {  // Removed extra space after "Student"
      return res.status(401).json({
        success: false,  // Corrected the typo here
        message:
          "You are not authorized to access this route, only students can access this route",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// isAdmin middleware
export const isAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(401).json({
        success: false,  // Ensured consistency in the "success" key
        message:
          "You are not authorized to access this route because you are not an admin",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

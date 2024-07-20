import User from "../Models/userModel.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  try {
    //fetch the data from the request body
    const { name, email, password, role } = req.body;

    //check if the user already exists
    const existingUser = await User.findOne({ email });

    // if the user already exists then send the response that user exists please login
    if (existingUser) {
      return res.status(400).json({
        success: false,
        meassage: "User already exists please login",
      });
    }

    //Now we will hash the passwrod 
    let hashedPassword;
    try{
      hashedPassword = await bcrypt.hash(password,12);

      // we will create new entry in the database
      const user =await User.create({
        name,
        email,
        password:hashedPassword,
        role,
      });
    }
    catch(error){
      return res.status(400).json({
        success:false,
        message:"cant signup please try again",
      });
    }
    res.status(200).json({
      success:true,
      message:"sign up successfully",
    });
    
    // send the response 
  } catch(error){
    return res.status(400).json({
      success:false,
      message:"cant signup please try again ",
    })
  }
};

export const login = async (req, res) => {};

 



 






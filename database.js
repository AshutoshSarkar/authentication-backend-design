import mongoose from "mongoose";
const connect = async () => {
  try {
    await mongoose.connect().then(() => {
      console.log("Database connected");
    });
  } catch (error) {
    console.log("Error connecting to database");
  }
};

export default connect;
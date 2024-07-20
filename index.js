import express from "express";
import { config } from "dotenv";
import  connect  from "./Config/database.js";
import user from './Routes/user.js'

//enviromental variable
config();

//express app
const app = express();

//middleware
app.use(express.json());

//default route
app.get("/", (req, res) => {
  res.send("this is auth app");
});

//server
app.listen(process.env.PORT, () => {
  console.log("server is running on port 3000");
});

//database connection
connect();

//Routes

app.use("/api/v1",user);
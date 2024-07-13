import express from "express";
import { config } from "dotenv";
import connect from "./Config/database.js";
import user from "./Routes/user.js";
config();

const app = express();

//to parse the data from the body
app.use(express.json());

connect();

app.get("/", (req, res) => {
  res.send("Hello World");
}
);

app.listen(process.env.PORT || 5000 , () => {
  console.log("Server is running on port 3000");
});

app.use("/api/v1", user);






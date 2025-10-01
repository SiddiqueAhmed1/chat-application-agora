import express from "express";
import dotenv from "dotenv";
import color from "colors";

// config
dotenv.config();
const port = process.env.PORT;

const app = express();

// server listen
app.listen(port, () => {
  console.log(`server is running on port ${port}`.bgGreen.black);
});

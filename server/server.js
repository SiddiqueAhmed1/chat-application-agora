import express from "express";
import dotenv from "dotenv";
import color from "colors";
import userRouter from "./Routing/userRegisterRouter.js";
import cors from "cors";

// app initialize
const app = express();

// config
dotenv.config();
const port = process.env.PORT;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(userRouter);

// server listen
app.listen(port, () => {
  console.log(`server is running on port ${port}`.bgGreen.black);
});

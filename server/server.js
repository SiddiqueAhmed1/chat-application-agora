import express from "express";
import dotenv from "dotenv";
import color from "colors";
import router from "./Routing/userRegisterRouter.js";

// config
dotenv.config();
const port = process.env.PORT;

const app = express();

app.use(router);

// server listen
app.listen(port, () => {
  console.log(`server is running on port ${port}`.bgGreen.black);
});

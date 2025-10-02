import express from "express";
import userRegisterController from "../Controller/userRegisterController.js";
const userRouter = express.Router();

userRouter.post("/api/register", userRegisterController);

export default userRouter;

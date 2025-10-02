import express from "express";
import userRegisterController, {
  userLogin,
} from "../Controller/userRegisterController.js";
const userRouter = express.Router();

userRouter.post("/api/register", userRegisterController);
userRouter.post("/api/login", userLogin);

export default userRouter;

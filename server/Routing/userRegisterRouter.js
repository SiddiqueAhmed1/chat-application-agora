import express from "express";
import userRegisterController, {
  getAllUsers,
  userLogin,
} from "../Controller/userRegisterController.js";
const userRouter = express.Router();

userRouter.post("/api/register", userRegisterController);
userRouter.post("/api/login", userLogin);
userRouter.get("/api/users", getAllUsers);

export default userRouter;

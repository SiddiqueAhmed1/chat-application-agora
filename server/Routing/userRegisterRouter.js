import express from "express";
import userRegisterController from "../Controller/userRegisterController.js";
const router = express.Router();

router.post("/api/register", userRegisterController);

export default router;

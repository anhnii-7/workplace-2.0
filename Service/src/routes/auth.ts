import { Router } from "express";
import { loginUser } from "../controller/auth";

const authRouter = Router();

authRouter.post("/", loginUser);

export { authRouter };
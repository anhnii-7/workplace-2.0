import { Router } from "express";
import { createUser, getUser, getUserByHobby, getUserWithInfo ,getMentors , getNewUsers } from "../controller/user";

const userRouter = Router();
userRouter
    .get("/", getUser)
    .get("/with-info", getUserWithInfo)
    .get("/by-hobby", getUserByHobby)
    .post("/", createUser)
    .get("/mentor", getMentors)
    .get("/new-user", getNewUsers);

export { userRouter }
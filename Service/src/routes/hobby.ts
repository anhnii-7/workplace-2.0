import { Router } from "express";
import { createHobby, getHobby, updateHobby } from "../controller/hobby";

const hobbyRouter = Router();
hobbyRouter
    .post("/", createHobby)
    .get("/", getHobby)
    .put("/:id", updateHobby)

export { hobbyRouter };
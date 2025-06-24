import { Router } from "express";
import { createDescription, getDescription } from "../controller/description";

const descriptionRouter = Router();
descriptionRouter
    .get("/", getDescription)
    .post("/", createDescription)

export { descriptionRouter };
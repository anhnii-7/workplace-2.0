import { Router } from "express";
import { createJobTitle, getJobTitle } from "../controller/jobTitle";

const jobTitleRouter = Router();
jobTitleRouter
    .get("/", getJobTitle)
    .post("/", createJobTitle)

export { jobTitleRouter };
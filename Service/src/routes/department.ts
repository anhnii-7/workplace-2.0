import { Router } from "express";
import { createDepartment, getDepartment, getDepartmentWithJobTitle } from "../controller/department";

const departmentRouter = Router();
departmentRouter
    .get("/", getDepartment)
    .get('/with-jobtitle', getDepartmentWithJobTitle)
    .post("/", createDepartment)

export { departmentRouter };
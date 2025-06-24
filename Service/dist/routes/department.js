"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.departmentRouter = void 0;
const express_1 = require("express");
const department_1 = require("../controller/department");
const departmentRouter = (0, express_1.Router)();
exports.departmentRouter = departmentRouter;
departmentRouter
    .get("/", department_1.getDepartment)
    .get('/with-jobtitle', department_1.getDepartmentWithJobTitle)
    .post("/", department_1.createDepartment);
//# sourceMappingURL=department.js.map
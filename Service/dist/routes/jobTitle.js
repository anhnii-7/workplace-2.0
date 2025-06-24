"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobTitleRouter = void 0;
const express_1 = require("express");
const jobTitle_1 = require("../controller/jobTitle");
const jobTitleRouter = (0, express_1.Router)();
exports.jobTitleRouter = jobTitleRouter;
jobTitleRouter
    .get("/", jobTitle_1.getJobTitle)
    .post("/", jobTitle_1.createJobTitle);
//# sourceMappingURL=jobTitle.js.map
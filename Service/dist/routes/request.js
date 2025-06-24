"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestsRouter = void 0;
const express_1 = require("express");
const request_1 = require("../controller/request");
const requestsRouter = (0, express_1.Router)();
exports.requestsRouter = requestsRouter;
requestsRouter
    .get("/", request_1.getRequests)
    .post("/", request_1.createRequest)
    .put("/:id", request_1.updateRequest)
    .post("/:id/end", request_1.endMentorship);
//# sourceMappingURL=request.js.map
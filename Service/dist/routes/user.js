"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_1 = require("../controller/user");
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
userRouter
    .get("/", user_1.getUser)
    .get("/with-info", user_1.getUserWithInfo)
    .get("/by-hobby", user_1.getUserByHobby)
    .post("/", user_1.createUser)
    .get("/mentor", user_1.getMentors)
    .get("/new-user", user_1.getNewUsers);
//# sourceMappingURL=user.js.map
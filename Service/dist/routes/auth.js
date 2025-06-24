"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../controller/auth");
const authRouter = (0, express_1.Router)();
exports.authRouter = authRouter;
authRouter.post("/", auth_1.loginUser);
//# sourceMappingURL=auth.js.map
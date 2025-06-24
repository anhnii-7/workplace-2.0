"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hobbyRouter = void 0;
const express_1 = require("express");
const hobby_1 = require("../controller/hobby");
const hobbyRouter = (0, express_1.Router)();
exports.hobbyRouter = hobbyRouter;
hobbyRouter
    .post("/", hobby_1.createHobby)
    .get("/", hobby_1.getHobby)
    .put("/:id", hobby_1.updateHobby);
//# sourceMappingURL=hobby.js.map
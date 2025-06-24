"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.descriptionRouter = void 0;
const express_1 = require("express");
const description_1 = require("../controller/description");
const descriptionRouter = (0, express_1.Router)();
exports.descriptionRouter = descriptionRouter;
descriptionRouter
    .get("/", description_1.getDescription)
    .post("/", description_1.createDescription);
//# sourceMappingURL=description.js.map
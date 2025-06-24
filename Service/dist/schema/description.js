"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const descriptionSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    }
});
const Description = mongoose_1.default.model("Description", descriptionSchema);
exports.default = Description;
//# sourceMappingURL=description.js.map
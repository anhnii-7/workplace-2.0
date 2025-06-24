"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateHobby = exports.getHobby = exports.createHobby = void 0;
const hobby_1 = __importDefault(require("../schema/hobby"));
const createHobby = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hobby = yield hobby_1.default.create(req.body);
        res.status(201).json({ success: true, hobby });
    }
    catch (error) {
        console.log(error);
        if (error.code === 11000) {
            res.status(400).json({ success: false, message: "Hobby already exists" });
        }
        else {
            res.status(500).json({ success: false, message: "Server error" });
        }
    }
});
exports.createHobby = createHobby;
const getHobby = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hobby = yield hobby_1.default.find();
    res.status(200).json(hobby);
});
exports.getHobby = getHobby;
const updateHobby = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title } = req.body;
    const hobby = yield hobby_1.default.findByIdAndUpdate(id, { title }, { new: true });
    res.status(200).json(hobby);
});
exports.updateHobby = updateHobby;
//# sourceMappingURL=hobby.js.map
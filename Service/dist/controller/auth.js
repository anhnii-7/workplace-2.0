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
exports.loginUser = void 0;
const user_1 = __importDefault(require("../schema/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: "Имэйл болон нууц үгээ оруулна уу"
            });
            return;
        }
        const user = yield user_1.default.findOne({ email })
            .populate('hobby')
            .populate('department')
            .populate('currentMentor');
        console.log(user);
        if (!user) {
            res.status(404).json({
                success: false,
                message: "Хэрэглэгч олдсонгүй"
            });
            return;
        }
        console.log(user.password, "userpass");
        if (password !== user.password) {
            res.status(401).json({
                success: false,
                message: "Нууц үг буруу байна"
            });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;
        res.status(200).json({
            success: true,
            token,
            user: userWithoutPassword
        });
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            success: false,
            message: "Серверийн алдаа гарлаа"
        });
    }
});
exports.loginUser = loginUser;
//# sourceMappingURL=auth.js.map
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
const express_1 = __importDefault(require("express"));
const connection_1 = require("./utils/connection");
const hobby_1 = require("./routes/hobby");
const user_1 = require("./routes/user");
const description_1 = require("./routes/description");
const jobTitle_1 = require("./routes/jobTitle");
const request_1 = require("./routes/request");
const department_1 = require("./routes/department");
const auth_1 = require("./routes/auth");
const cors_1 = __importDefault(require("cors"));
const port = 8000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/hobby", hobby_1.hobbyRouter);
app.use("/user", user_1.userRouter);
app.use("/description", description_1.descriptionRouter);
app.use("/jobTitle", jobTitle_1.jobTitleRouter);
app.use("/department", department_1.departmentRouter);
app.use("/request", request_1.requestsRouter);
app.use("/login", auth_1.authRouter);
app.get("/", (_req, res) => {
    res.send("Hello World");
});
const connectDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, connection_1.connection)();
    }
    catch (err) {
        console.error(err);
    }
});
connectDb();
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server is running on port ${port}`);
}));
//# sourceMappingURL=index.js.map
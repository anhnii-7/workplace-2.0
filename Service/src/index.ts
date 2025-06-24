import express from "express";
import { connection } from "./utils/connection";
import { Request, Response } from "express"
import { hobbyRouter } from "./routes/hobby";
import { userRouter } from "./routes/user";
import { descriptionRouter } from "./routes/description";
import { jobTitleRouter } from "./routes/jobTitle";
import { requestsRouter } from "./routes/request";
import { departmentRouter } from "./routes/department";
import { authRouter } from "./routes/auth"
import cors from "cors";
const port = 8000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/hobby", hobbyRouter);
app.use("/user", userRouter);
app.use("/description", descriptionRouter);
app.use("/jobTitle", jobTitleRouter);
app.use("/department", departmentRouter);
app.use("/request", requestsRouter);
app.use("/login", authRouter);


app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World")
})

const connectDb = async () => {
  try {
    await connection()
  } catch (err) {
    console.error(err)
  }
}
connectDb()

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`)
})

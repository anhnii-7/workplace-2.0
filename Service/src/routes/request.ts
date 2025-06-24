import { Router } from "express";
import { 
    getRequests, 
    createRequest, 
    updateRequest,
    endMentorship 
} from "../controller/request";

const requestsRouter = Router();

requestsRouter
    .get("/", getRequests)
    .post("/", createRequest)
    .put("/:id", updateRequest)
    .post("/:id/end", endMentorship);

export { requestsRouter };
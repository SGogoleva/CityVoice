import { Router } from "express";
import { sendMessage, checkMessageInput } from "./msg.controller";
import { authMiddleware } from "../auth/auth.middleware";

const messageRouter: Router = Router();

messageRouter.post("/sent", authMiddleware, checkMessageInput, sendMessage);

export default messageRouter;

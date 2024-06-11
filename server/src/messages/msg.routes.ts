import { Router } from "express";
import { sendMessage, checkMessageInput } from "./msg.controller";
import checkAuth from "../auth/auth.check";

const messageRouter: Router = Router();

messageRouter.post("/sent", checkAuth, checkMessageInput, sendMessage);

export default messageRouter;

import { Router } from "express";
import { sendMessage, checkMessageInput, getMessagesPaginated, getMessageById } from "./msg.controller";
import checkAuth from "../auth/auth.check";

const messageRouter: Router = Router();

messageRouter
.get('/', getMessagesPaginated)
.get('/single/:id', getMessageById)
.post("/sent", checkAuth, checkMessageInput, sendMessage);

export default messageRouter;

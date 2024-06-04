import { Router } from "express";
import { sendMessage, checkMessageInput } from './msg.controller';

const messageRouter: Router = Router();

messageRouter.post('/messages', checkMessageInput, sendMessage);

export default messageRouter;
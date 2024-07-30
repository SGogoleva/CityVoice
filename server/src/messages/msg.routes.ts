import { Router } from "express";
import {
  sendMessage,
  checkMessageInput,
  getMessagesPaginated,
  getMessageById,
} from "./msg.controller";
import checkAuth from "../auth/auth.check";
import { uploadMessageImages } from "../config/multerConfig";

const messageRouter: Router = Router();

messageRouter
  .get("/", getMessagesPaginated)
  .get("/single/:id", getMessageById)
  .post(
    "/sent",
    checkAuth,
    uploadMessageImages.array("images", 3),
    checkMessageInput,
    sendMessage
  );

export default messageRouter;

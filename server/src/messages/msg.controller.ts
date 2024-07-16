import { MessagesModel } from "../models/models";
import messageSchema from "../schemas/messageSchema";
import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../types/authRequest";
import { userService } from "../users/users.service";
import { messageService } from "./msg.service";
import mongoose from "mongoose";

export const getMessagesPaginated = async (req: Request, res: Response) => {
  try {
    const { page, limit, sortBy, sortOrder } = req.query;
    if (!page || !limit) {
      return res.status(400).json({ message: "Invalid messages page or limit" });
    }
    const messages = await messageService.getMessagesPaginated({
      page: +page,
      limit: +limit,
      sortBy: sortBy as string,
      sortOrder: sortOrder as "asc" | "desc",
    });
    return res.status(201).json(messages);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const getMessageById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Invalid messageId" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const objectId = new mongoose.Types.ObjectId(id);
    const message = await messageService.getMessageById(objectId);
    res.status(200).json(message);
  } catch (error) {
    console.log(error);
  }
};


export const sendMessage = async (req: AuthRequest, res: Response) => {
  const { messageBody, authority, messageTheme, images, userId } = req.body;
  try {
    const newMessage = new MessagesModel({
      messageBody,
      authority: {
        authorityName: authority.authorityName,
        authorityId: authority.authorityId,
      },
      messageTheme,
      images,
    });
    const saveMessage = await newMessage.save();
    const messageId = saveMessage._id;
    await userService.updateMessageSent({ messageId, userId });
    return res.status(201).json({
      message: "Message sent successfully",
      MessageStatus: saveMessage.status,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const checkMessageInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const messageParsed = messageSchema.safeParse(req.body);
  if (!messageParsed.success) {
    return res.status(400).json({ message: "Invalid input" });
  }
  next();
};

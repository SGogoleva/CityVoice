import { MessagesModel } from "../models/models";
import messageSchema from "../schemas/messageSchema";
import { Request, Response, NextFunction } from "express";
import {AuthRequest} from "../types/authRequest"


export const sendMessage = async (req: AuthRequest, res: Response) => {
  const { messageTitle, messageBody, authority, messageTheme, images } =
    req.body;
  try {
    const newMessage = new MessagesModel({
      // messageTitle,
      messageBody,
      authority: {
        authorityName: authority.authorityName,
        authorityId: authority.authorityId,
      },
      messageTheme,
      images,
    });
    const saveMessage = await newMessage.save();

    if (req.user) {
      req.user.messageId.push(saveMessage._id);
      await req.user.save();
    }

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

import { MessagesModel } from "../models/models";
import messageSchema from "../schemas/messageSchema";
import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../types/authRequest";
import { userService } from "../users/users.service";
import { messageService } from "./msg.service";
import mongoose from "mongoose";
import uploadImage from "../media/media.service";
import stringToBoolean from "../utils/stringConversion";

export const getMessagesPaginated = async (req: Request, res: Response) => {
  try {
    const { page, limit, sortBy, sortOrder } = req.query;
    if (!page || !limit) {
      return res
        .status(400)
        .json({ message: "Invalid messages page or limit" });
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
  const { isVisible, messageBody, authority, messageTheme, userId } = req.body;
  const images = req.files as Express.Multer.File[];
  try {
    let imageUrls: string[] = [];
    if (images && images.length > 0) {
      if (images.length > 3) {
        return res
          .status(400)
          .json({ message: "You can upload a maximum of 3 images." });
      }
      const imageUploadPromises = images.map(async (img) => {
        const { buffer, originalname } = img;
        const uploadResult = await uploadImage({ buffer, originalname });
        return uploadResult.secure_url;
      });

      imageUrls = await Promise.all(imageUploadPromises);
    }

    const newMessage = new MessagesModel({
      isVisible: stringToBoolean(isVisible),
      messageBody,
      authority: {
        authorityName: authority.authorityName,
        authorityId: authority.authorityId,
      },
      messageTheme,
      userId,
      images: imageUrls,
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
  const images = req.files as Express.Multer.File[];

  const combinedData = {
    ...req.body,
    images: images ? images : [],
  };

  const messageParsed = messageSchema.safeParse(combinedData);
  if (!messageParsed.success) {
    return res
      .status(400)
      .json({ message: "Invalid input", errors: messageParsed.error.errors });
  }
  next();
};

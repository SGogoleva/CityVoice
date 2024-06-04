import { MessagesModel } from "../models/models";
import messageSchema from "../schemas/messageSchema";

export const sendMessage = async (req, res) => {
  const { messageTitle, messageBody, authority, status, attachments } =
    req.body;
  const newMessage = new MessagesModel({
    messageTitle,
    messageBody,
    authority: {
      authorityName: authority.authorityName,
    },
    status,
    attachments,
  });
  const saveMessage = await newMessage.save();
  return res.status(201).json({
    message: "Message sent successfully",
  });
};

export const checkMessageInput = (req, res, next) => {
  const messageParsed = messageSchema.safeParse(req.body);
  if (!messageParsed.success) {
    return res.status(400).json({ message: "Invalid input" });
  }
  next();
};

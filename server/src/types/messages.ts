import mongoose from "mongoose";

export enum MessageStatus {
  sent = "message is sent",
  read = "message is read",
  replied = "message is replied",
}

export interface Messages {
  dateCreated: string;
  messageTitle: string;
  messageBody: string;
  authorityId: string;
  status: MessageStatus;
}

export interface UserMessages {
  messageId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
}
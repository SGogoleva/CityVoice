import mongoose from "mongoose";
import { MessageStatus } from "../types/messages";

const usersSchema = new mongoose.Schema({
  name: {
    firstName: String,
    lastName: String,
  },
  DOB: Date,
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  city: {
    cityId: String,
    cityName: String,
  },
  dateCreated: { type: Date, default: Date.now },
  projectId: { type: [String], default: [] },
  messageId: { type: [String], default: [] },
  earnedPoints: { type: Number, default: 0 },
});

const projectsSchema = new mongoose.Schema({
  authority: {
    authorityId: String,
    authorityName: String,
  },
  name: String,
  describtion: String,
  dateCreated: { type: Date, default: Date.now },
  questionnaire: { type: [String], default: [] },
  pollPrice: { type: Number, default: 0 },
});

const messagesSchema = new mongoose.Schema({
  dateCreated: { type: Date, default: Date.now },
  messageTitle: String,
  messageBody: String,
  authority: {
    authorityId: String,
    authorityName: String,
  },
  status: {
    type: String,
    required: true,
    enum: [MessageStatus.sent, MessageStatus.read, MessageStatus.replied],
  },
});

export const UsersModel = mongoose.model("Users", usersSchema);
export const ProjectsModel = mongoose.model("Projects", projectsSchema);
export const MessagesModel = mongoose.model("Messages", messagesSchema);

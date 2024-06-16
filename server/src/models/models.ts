import mongoose from "mongoose";
import { MessageStatus } from "../types/messages";

const usersSchema = new mongoose.Schema({
  name: {
    firstName: String,
    lastName: String,
  },
  DOB: Date,
  phone: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  city: {
    cityId: { type: String, default: "" },
    cityName: String,
  },
  dateCreated: { type: Date, default: Date.now },
  projectId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Projects' }],
  messageId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Messages' }],
  earnedPoints: { type: Number, default: 0 },
});

const answerSchema = new mongoose.Schema({
  optionText: { type: String, required: true },
  voteCount: {type: Number, default: 0}
});

const questionSchema = new mongoose.Schema({
  questionText: String,
  type: { type: String, enum: ["boolean", "multiple_choice"], required: true },
  options: [answerSchema],
});

const projectsSchema = new mongoose.Schema({
  authority: {
    authorityId: String,
    authorityName: String,
  },
  city: {
    cityId: { type: String, default: "" },
    cityName: String,
  },
  name: String,
  describtion: String,
  dateCreated: { type: Date, default: Date.now },
  questionnaire: { type: [questionSchema], default: [] },
  pollPrice: { type: Number, default: 0 },
  dueDate: String,
  imageUrl: String
});

const imageSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: [true, "Filename is required"],
  },
  mimetype: {
    type: String,
    enum: ["image/png", "image/jpeg", "image/jpg"],
    required: true,
  },
  size: {
    type: Number,
    required: true,
    max: [5 * 1024 * 1024, "File size should not exceed 5MB"],
  },
});

const messagesSchema = new mongoose.Schema({
  dateCreated: { type: Date, default: Date.now },
  // messageTitle: {
  //   type: String,
  //   required: [true, "Title is required"],
  // },
  messageBody: {
    type: String,
    required: [true, "Message is required"],
  },
  authority: {
    authorityId: String,
    authorityName: String,
  },
  messageTheme: String,
  status: {
    type: String,
    required: true,
    enum: [MessageStatus.sent, MessageStatus.read, MessageStatus.replied],
    default: MessageStatus.sent,
  },
  images: {
    type: [imageSchema],
    default: [],
    validate: {
      validator: function (val: string) {
        return val.length <= 3;
      },
      message: "You can upload a maximum of 3 images",
    },
  },
});

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true }
})

const authoritySchema = new mongoose.Schema({
  authorityName: { type: String, required: true },
  services: [serviceSchema]
})

const geoPointSchema = new mongoose.Schema({
  __type: {
    type: String,
    enum: ['GeoPoint'],
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  }
});

const citySchema = new mongoose.Schema({
  location: {
    type: geoPointSchema,
    required: true
  },
  cityId: {
    type: String,
    required: true,
    unique: true
  },
  cityName: {
    type: String,
    required: true
  }
});

export const UsersModel = mongoose.model("Users", usersSchema);
export const ProjectsModel = mongoose.model("Projects", projectsSchema);
export const MessagesModel = mongoose.model("Messages", messagesSchema);
export const authoritiesSchema = mongoose.model("Authorities", authoritySchema);
export const City = mongoose.model('City', citySchema);
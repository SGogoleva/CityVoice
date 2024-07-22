import mongoose from "mongoose";
import { MessageStatus } from "../types/messages";
import {
  imageSchema,
  locationSchema,
  questionSchema,
  serviceSchema,
} from "./supportSchemas";
import { boolean } from "zod";

/**
 * Users model schema
 */
const usersSchema = new mongoose.Schema(
  {
    name: {
      firstName: String,
      lastName: String,
    },
    DOB: Date,
    numberID: { type: String, unique: true, required: true },
    phone: {
      type: String,
      unique: true,
      required: true,
      set: function (value: string) {
        if (value.startsWith("0")) {
          return "+972" + value.substring(1);
        }
        return value;
      },
    },
    email: { type: String, unique: true, required: true },
    passwordHash: { type: String, required: true, maxlength: 61 },
    city: { type: String, required: true },
    location: { type: locationSchema, default: {} },
    dateCreated: { type: Date, default: Date.now },
    projectId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Projects" }],
    messageId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Messages" }],
    earnedPoints: { type: Number, default: 0 },
    avatarUrl: { type: String, default: "https://res.cloudinary.com/dizvpvkdj/image/upload/v1721651871/empty_avatar_n0sxxp.png" } 
  },
  {
    toObject: {
      virtuals: true, // Include virtuals
      versionKey: false, // Exclude __v field
      transform: function (doc, ret) {
        ret.id = ret._id; // Rename _id to id
        delete ret._id; // Remove _id
      },
    },
    toJSON: {
      virtuals: true, // Include virtuals
      versionKey: false, // Exclude __v fields
      transform: function (doc, ret) {
        ret.id = ret._id; // Rename _id to id
        delete ret._id; // Remove _id
      },
    },
  }
);

/**
 * Projects model schema
 */
const projectsSchema = new mongoose.Schema(
  {
    authority: {
      authorityId: String,
      authorityName: String,
    },
    location: { type: locationSchema, default: {} },
    name: String,
    describtion: String,
    dateCreated: { type: Date, default: Date.now },
    questionnaire: { type: [questionSchema], default: [] },
    pollPrice: { type: Number, default: 0 },
    dueDate: String,
    imageUrl: String,
  },
  {
    toObject: {
      virtuals: true, // Include virtuals
      versionKey: false, // Exclude __v field
      transform: function (doc, ret) {
        ret.id = ret._id; // Rename _id to id
        delete ret._id; // Remove _id
      },
    },
    toJSON: {
      virtuals: true, // Include virtuals
      versionKey: false, // Exclude __v fields
      transform: function (doc, ret) {
        ret.id = ret._id; // Rename _id to id
        delete ret._id; // Remove _id
      },
    },
  }
);

/**
 * Messages model schema
 */
const messagesSchema = new mongoose.Schema(
  {
    dateCreated: { type: Date, default: Date.now },
    isVisible: { type: Boolean, required: true },
    messageBody: {
      type: String,
      required: [true, "Message is required"],
    },
    authority: {
      authorityId: String,
      authorityName: String,
    },
    messageTheme: String,
    location: { type: locationSchema, default: {} },
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
  },
  {
    toObject: {
      virtuals: true, // Include virtuals
      versionKey: false, // Exclude __v field
      transform: function (doc, ret) {
        ret.id = ret._id; // Rename _id to id
        delete ret._id; // Remove _id
      },
    },
    toJSON: {
      virtuals: true, // Include virtuals
      versionKey: false, // Exclude __v fields
      transform: function (doc, ret) {
        ret.id = ret._id; // Rename _id to id
        delete ret._id; // Remove _id
      },
    },
  }
);

const authoritySchema = new mongoose.Schema({
  authorityName: { type: String, required: true },
  services: [serviceSchema],
});

const citySchema = new mongoose.Schema({
  cityId: {
    type: String,
    required: true,
    unique: true,
  },
  cityName: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
});

export const UsersModel = mongoose.model("Users", usersSchema);
export const ProjectsModel = mongoose.model("Projects", projectsSchema);
export const MessagesModel = mongoose.model("Messages", messagesSchema);
export const authoritiesSchema = mongoose.model("Authorities", authoritySchema);
export const City = mongoose.model("City", citySchema);

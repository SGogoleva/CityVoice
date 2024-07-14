import mongoose from "mongoose";

export const addressSchema = new mongoose.Schema({
  houseNumber: { type: String, default: "" },
  street: { type: String, default: "" },
  postcode: { type: String, default: "" },
  city: { type: String, default: "" },
  suburb: { type: String, default: "" },
});

export const locationSchema = new mongoose.Schema({
  latitude: { type: Number, default: 0 },
  longitude: { type: Number, default: 0 },
  address: { type: addressSchema, default: {} },
});

export const answerSchema = new mongoose.Schema({
  optionText: { type: String, required: true },
  voteCount: { type: Number, default: 0 },
});

export const questionSchema = new mongoose.Schema({
  questionText: String,
  type: { type: String, enum: ["boolean", "multiple_choice"], required: true },
  options: [answerSchema],
});

export const imageSchema = new mongoose.Schema({
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

export const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

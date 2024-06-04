import { z } from "zod";
import { MessageStatus } from "../types/messages";

const MAX_FILES = 3;
const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = ["image/png", "image/jpeg", "image/jpg"];

const imageSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= MAX_UPLOAD_SIZE;
    }, "File size must be less than 3MB")
    .refine((file) => {
      return ACCEPTED_FILE_TYPES.includes(file.type);
    }, "File must be a PNG"),
});

const messageSchema = z.object({
  messageTitle: z.string(),
  messageBody: z.string(),
  authority: z.object({
    authorityName: z.string(),
  }),
  status: z.enum([
    MessageStatus.sent,
    MessageStatus.read,
    MessageStatus.replied,
  ]),
  attachments: z
    .array(imageSchema)
    .refine((files) => files.length <= MAX_FILES, {
      message: "You can upload a maximum of 3 images",
    }).optional(),
});

export default messageSchema;

import { z } from "zod";
import { MessageStatus } from "../types/messages";

// const MAX_FILES = 3;
// const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
// const ACCEPTED_FILE_TYPES = ["image/png", "image/jpeg", "image/jpg"];

// const imageSchema = z.object({ -- WILL BE USED IN FE, IN INPUT FILE COMPONENT!!!
//   file: z
//     .instanceof(File)
//     .refine((file) => {
//       return !file || file.size <= MAX_UPLOAD_SIZE;
//     }, "File size must be less than 3MB")
//     .refine((file) => {
//       return ACCEPTED_FILE_TYPES.includes(file.type);
//     }, "File must be a PNG"),
// });

const imageSchema = z.object({
  filename: z.string().min(1, { message: "Filename is required" }),
  mimetype: z.enum(["image/png", "image/jpeg", "image/jpg"]),
  size: z.number().max(5 * 1024 * 1024, "File size should not exceed 5MB"), // Example: 5MB max size
});

const messageSchema = z.object({
  isVisible: z.boolean({
    required_error: "isVisible is required",
    invalid_type_error: "isVisible must be a boolean",
  }),
  messageBody: z
    .string()
    .min(5, { message: "Message is required" })
    .max(500, { message: "Exceeded maximum characters allowed" }),
  messageTheme: z.string(),
  authority: z.object({
    authorityName: z.string(),
  }),
  images: z
    .array(imageSchema)
    .max(3, { message: "You can upload a maximum of 3 images" })
    .optional(),
});

export default messageSchema;

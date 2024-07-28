import { z } from "zod";

const imageSchema = z.object({
  originalname: z.string(),
  mimetype: z.string().refine((val) => val.startsWith("image/"), {
    message: "File must be an image",
  }),
  buffer: z.instanceof(Buffer),
  size: z.number().max(5 * 1024 * 1024, "File size should not exceed 5MB"),
});

const messageSchema = z.object({
  isVisible: z.string({
    required_error: "isVisible is required",
    invalid_type_error: "isVisible must be either true or false",
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

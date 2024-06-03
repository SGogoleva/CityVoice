import { z } from "zod";
import { MessageStatus } from "../types/messages";

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
});

export default messageSchema;

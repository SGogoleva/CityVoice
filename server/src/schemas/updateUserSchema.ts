import { z } from "zod";
import { SCHEMAS_CONSTANTS } from "../config/const";

const updateUserSchema = z.object({
  name: z
    .object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
    })
    .optional(),
  phone: z
    .string()
    .length(10, { message: "Phone number must be exactly 10 digits long" })
    .regex(SCHEMAS_CONSTANTS.PHONE_REGEX, {
      message: "Phone number must start with 05 and contain only digits",
    })
    .optional(),
  email: z.string().optional(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(SCHEMAS_CONSTANTS.PASSORD_REGEX, {
      message:
        "Password must include at least one digit and one special character",
    })
    .optional(),
  city: z.string().optional(),
});

export default updateUserSchema
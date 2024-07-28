import { z } from "zod";

const userLoginSchema = z.object({
  numberID: z
    .string()
    .regex(/^\d+$/, "Must contain only digits")
    .length(9, "Must be 9 digits long"),
  password: z.string().min(5, { message: "Password is required" }),
});

export default userLoginSchema;

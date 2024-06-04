import { z } from "zod";

const userLoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(5, { message: "Password is required" }),
});

export default userLoginSchema;

import { z } from "zod";

const userLoginSchema = z.object({
  // username: z
  //   .number()
  //   .int()
  //   .gte(100000000, { message: "Username must be 9 digits" })
  //   .lte(999990000, { message: "Username must be 9 digits" }),
  numberID: z.string(),
  password: z.string().min(5, { message: "Password is required" }),
});

export default userLoginSchema;

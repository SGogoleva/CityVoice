import { z } from "zod";

const userLoginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export default userLoginSchema;

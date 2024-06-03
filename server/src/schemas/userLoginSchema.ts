import { z } from "zod";

const userLoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export default userLoginSchema;

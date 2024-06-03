import { any } from "zod";
import { UsersModel } from "../models/models";
import { hashPassword } from "../utils/bcrypt";

export const registraionService = {
  register: async (email: string, password: string) => {
    const user = await UsersModel.findOne({ email });
    if (user) {
      return false;
    }

    const passwordHash = await hashPassword(password);
    return passwordHash;
  },
};

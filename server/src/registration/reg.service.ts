import { UsersModel } from "../models/models";
import { hashPassword } from "../utils/bcrypt";

export const registraionService = {
  isUserExists: async (numberID: number) => {
    const user = await UsersModel.findOne({ numberID });
    return user !== null;
  },
  getHashedPassword: async (password: string): Promise<string> => {
    const passwordHash = await hashPassword(password);
    return passwordHash;
  },
};

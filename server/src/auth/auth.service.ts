import { generateToken } from "../utils/jwt";
import { verifyPassword } from "../utils/bcrypt";
import { UsersModel } from "../models/models";
import { UserLogin } from "../types/users";

export const authService = {
  login: async ({ numberID, password }: UserLogin) => {
    const user = await UsersModel.findOne({ numberID });

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await verifyPassword(password, user.passwordHash);

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const token = generateToken({ id: user.id, username: user.numberID });

    const userToObject = user.toObject();
    const { passwordHash, ...userToReturn } = userToObject;

    return {
      token,
      user: userToReturn,
    };
  },
};

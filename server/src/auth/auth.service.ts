import { generateToken } from "../utils/jwt";
import { verifyPassword } from "../utils/bcrypt";
import { UsersModel } from "../models/models";

export const authService = {
  login: async (email: string, password: string) => {
    const user = await UsersModel.findOne({ email });

    if (!user) {
      return null;
    }

    const isPasswordValid = await verifyPassword(password, user.passwordHash);

    if (!isPasswordValid) {
      return null;
    }

    const { email: userEmail, _id } = user;
    const token = generateToken({ id: _id.toString(), email: userEmail });

    (user as any).passwordHash = undefined;

    return {
      token,
      user,
    };
  },
};

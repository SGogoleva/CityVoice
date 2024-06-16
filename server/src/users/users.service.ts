import { UsersModel } from "../models/models";

export const userService = {
  getUserById: async (id: string) => {
    try {
      const user = await UsersModel.findById(id).select("-passwordHash");
      return user;
    } catch (error) {
      console.error("Error getting user by ID:", error);
      throw new Error("User not found");
    }
  },
};

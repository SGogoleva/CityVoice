import { Db } from "mongodb";
import { UsersModel } from "../models/models";
import { UserMessages } from "../types/messages";
import { UpdateUserVotes, UpdatedUserInfo } from "../types/users";

export const userService = {
  getUserById: async (id: UpdateUserVotes["userId"]) => {
    try {
      const user = await UsersModel.findById(id).select("-passwordHash");
      return user;
    } catch (error) {
      console.error("Error getting user by ID:", error);
      throw new Error("User not found");
    }
  },
  updateVoteResults: async ({
    userId,
    pollPrice,
    projectId,
  }: UpdateUserVotes) => {
    try {
      const user = await userService.getUserById(userId);
      if (!user) {
        throw new Error("User not found");
      }

      user.earnedPoints += pollPrice;
      if (user.projectId.includes(projectId)) {
        throw new Error("User already voted for the project");
      }
      user.projectId?.push(projectId);
      const updatedVoteUser = await user.save();
      return updatedVoteUser;
    } catch (error) {
      console.error("Error updating vote results:", error);
      throw error;
    }
  },
  updateMessageSent: async ({ userId, messageId }: UserMessages) => {
    try {
      const user = await userService.getUserById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      const updatedUserMessage = await UsersModel.updateOne(
        { _id: userId },
        { $addToSet: { messageId: messageId } }
      );
      return updatedUserMessage;
    } catch (error) {
      console.error("Error updating messages:", error);
      throw error;
    }
  },
  updateUser: async ({userId, updatedFields}: UpdatedUserInfo) => {}
};

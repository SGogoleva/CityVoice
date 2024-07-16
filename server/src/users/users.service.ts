import { Db } from "mongodb";
import { UsersModel } from "../models/models";
import { UserMessages } from "../types/messages";
import { UpdateUserVotes, UpdatedUserInfo } from "../types/users";
import { MESSAGE_PRICE } from "../config/const";
import { Pagination } from "../types/pagination";

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
  getUsersPaginated: async ({
    page,
    limit,
    sortBy,
    sortOrder,
  }: Pagination) => {
    try {
      const sort: Record<string, 1 | -1> = {};
      if (sortBy && sortOrder) {
        sort[sortBy] = sortOrder === "asc" ? 1 : -1;
      }

      const result = await UsersModel.find()
      .select('name.firstName name.lastName earnedPoints -_id messageId projectId')
      .sort(sortBy && sortOrder ? sort : {})
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

      const count = await UsersModel.countDocuments();

      return {
        result,
        currentLimit: limit,
        totalEntries: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      };
    } catch (error) {
      console.error(error);
      return [];
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
        {
          $addToSet: { messageId: messageId },
          $inc: { earnedPoints: MESSAGE_PRICE },
        }
      );
      return updatedUserMessage;
    } catch (error) {
      console.error("Error updating messages:", error);
      throw error;
    }
  },
  updateUser: async ({ userId, updatedFields }: UpdatedUserInfo) => {},
};

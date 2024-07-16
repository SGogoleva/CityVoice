import { MessagesModel } from "../models/models";
import { Messages, UserMessages } from "../types/messages";
import { Pagination } from "../types/pagination";

export const messageService = {
    getMessagesPaginated: async ({
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
    
          const result = await MessagesModel.find()
          .sort(sortBy && sortOrder ? sort : {})
          .skip((page - 1) * limit)
          .limit(limit)
          .exec();

          const count = await MessagesModel.countDocuments();

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
      getMessageById: async (messageId: UserMessages["messageId"]) => {
        try {
          const message = await MessagesModel.findById(messageId);
          return message;
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }

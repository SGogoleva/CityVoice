import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendMessage, getMessagesPaginated } from "../../http";
import { message } from "../../types/messages";
import { Pagination } from "../../types/pagination";

export const sendMessageThunk = createAsyncThunk(
  "message/sendMessage",
  async (messageData: message) => {
    return await sendMessage(messageData);
  }
);

export const fetchMessagesThunk = createAsyncThunk<
  { messages: message[]; totalPages: number },
  Pagination,
  { rejectValue: Error }
>(
  "messages/fetchMessagesPaginated",
  async ({ limit, page, sortBy, sortOrder }: Pagination) => {
    const response = await getMessagesPaginated({
      limit,
      page,
      sortBy,
      sortOrder,
    });
    return response;
  }
);

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchMessagesThunk, sendMessageThunk } from "../thunks/message.thunk";
import { message } from "../../types/messages";

interface MessagesState {
  messages: message[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
}

const initialState: MessagesState = {
  messages: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  sortBy: "dateCreated",
  sortOrder: "desc",
};

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessagesPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSortBy(state, action: PayloadAction<string>) {
      state.sortBy = action.payload;
      state.currentPage = 1;
      state.messages= [];
    },
    setSortOrder(state, action: PayloadAction<"asc" | "desc">) {
      state.sortOrder = action.payload;
      state.currentPage = 1;
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessageThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendMessageThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push = action.payload;
      })
      .addCase(sendMessageThunk.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred";
        state.loading = false;
      })
      .addCase(fetchMessagesThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessagesThunk.fulfilled, (state, action) => {
        if (state.currentPage === 1) {
          state.messages = action.payload.messages;
        } else {
          state.messages = [...state.messages, ...action.payload.messages];
        }
        state.totalPages = action.payload.totalPages;
        state.loading = false;
      })
      .addCase(fetchMessagesThunk.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch messages";
        state.loading = false;
      });
  },
});

export default messageSlice.reducer;
export const { setMessagesPage, setSortBy, setSortOrder } =
  messageSlice.actions;

// const messageSlice = createSlice({
//     name: "messages",
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//           .addCase(sendMessageThunk.pending, (state) => {
//             state.loading = true;
//           })
//           .addCase(sendMessageThunk.fulfilled, (state, action) => {
//             state.loading = false;
//             state.message = action.payload;
//           })
//           .addCase(sendMessageThunk.rejected, (state, action) => {
//             state.error = action.error.message || "An error occurred";
//             state.loading = false;
//           });
//       },
// })

// export default messageSlice.reducer

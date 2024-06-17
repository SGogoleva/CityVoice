import { createSlice } from "@reduxjs/toolkit";
import { sendMessageThunk } from "../thunks/message.thunk";
import { message } from "../../types/messages";
import { FetchStatusState } from "../../types/status";

type messageType = {
    message: message | null
}

const initialState: messageType & FetchStatusState = {
    message: null,
    loading: false,
    error: null,
}

const messageSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(sendMessageThunk.pending, (state) => {
            state.loading = true;
          })
          .addCase(sendMessageThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload;
          })
          .addCase(sendMessageThunk.rejected, (state, action) => {
            state.error = action.error.message || "An error occurred";
            state.loading = false;
          });
      },
})

export default messageSlice.reducer
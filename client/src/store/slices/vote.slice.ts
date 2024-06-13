import { createSlice } from "@reduxjs/toolkit";
import { postVote } from "../../http";
import { postVoteThunk } from "../thunks/project.thunk";

interface VotingState {
  loading: boolean;
  error: string | null;
  status: string | null;
}

const initialState: VotingState = {
  loading: false,
  error: null,
  status: null,
};

const votingSlice = createSlice({
  name: "voting",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postVoteThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postVoteThunk.fulfilled, (state) => {
        state.loading = false;
        state.status = "Thank you for your vote"
      })
      .addCase(postVoteThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to post vote";
        state.status = null
      });
  },
});

export default votingSlice.reducer;

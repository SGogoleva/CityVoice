import { createSlice } from "@reduxjs/toolkit";
import { getUserThunk } from "../thunks/user.thunk";
import { loggedUser } from "../../types/userType";

interface UserState {
  user: loggedUser | null;
  loading: boolean;
}

const initialState: UserState = {
  user: null,
  loading: false,
};

const getUserSlice = createSlice({
    name: "getUser",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getUserThunk.pending, (state) => {
            state.loading = true;
          })
          .addCase(getUserThunk.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
          })
          .addCase(getUserThunk.rejected, (state) => {
            state.loading = false;
          });
    }
})

export default getUserSlice.reducer
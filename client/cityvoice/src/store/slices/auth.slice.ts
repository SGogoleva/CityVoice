import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Users } from "../../types/userType";
import { loginThunk } from "../thunks/auth.thunk";
import { FetchStatusState } from "../../types/status";  
import { UserName } from "../../types/userType";

const initialState: UserName & FetchStatusState = {
  firstName: null,
  loading: false,
  error: null
};

const UsersAuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.firstName = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false
        state.firstName = action.payload.firstName
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.error = action.error.message || 'An error occurred'
        state.loading = false
      })
  }
})  
;

export default UsersAuthSlice.reducer;
export const { logout } = UsersAuthSlice.actions;

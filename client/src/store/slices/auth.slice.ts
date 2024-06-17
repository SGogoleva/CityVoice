import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loggedUser } from "../../types/userType";
import { loginThunk, logoutThunk } from "../thunks/auth.thunk";
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
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action: PayloadAction<loggedUser>) => {
        state.loading = false
        state.firstName = action.payload.name.firstName
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.error = action.error.message || 'An error occurred'
        state.loading = false
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.firstName = null;
      });
  }
})  
;

export default UsersAuthSlice.reducer;
export const { logout } = UsersAuthSlice.actions;

import { createSlice } from "@reduxjs/toolkit";
import { checkAuthThunk } from "../thunks/auth.thunk";
import { authenticatedUser } from "../../types/userType";

interface AuthState {
  user: authenticatedUser | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
};

const isAuthSlice = createSlice({
    name: "isAuth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(checkAuthThunk.pending, (state) => {
            state.loading = true;
          })
          .addCase(checkAuthThunk.fulfilled, (state, action) => {
            state.isAuthenticated = action.payload.isAuthenticated;
            state.user = action.payload.user;
            state.loading = false;
          })
          .addCase(checkAuthThunk.rejected, (state) => {
            state.isAuthenticated = false;
            state.loading = false;
          });
    }
})

export default isAuthSlice.reducer
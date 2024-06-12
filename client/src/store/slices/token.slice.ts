import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { checkAuthThunk } from "../thunks/auth.thunk";

const isAuthSlice = createSlice({
    name: "isAuth",
    initialState: {
        isAuthenticated: false,
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(checkAuthThunk.pending, (state) => {
            state.loading = true;
          })
          .addCase(checkAuthThunk.fulfilled, (state, action) => {
            state.isAuthenticated = action.payload;
            state.loading = false;
          })
          .addCase(checkAuthThunk.rejected, (state) => {
            state.isAuthenticated = false;
            state.loading = false;
          });
    }
})

export default isAuthSlice.reducer
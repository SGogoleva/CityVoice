import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "../../types/userType";
import { registerUserThunk } from "../thunks/reg.thunk";
import { FetchStatusState } from "../../types/status";

type registerState = {
  user: registerUser | null;
};

const initialState: registerState & FetchStatusState = {
  user: null,
  loading: false,
  error: null,
};

const UsersRegSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    // setUser: (state, action: PayloadAction<registerUser>) => {
    //   state.user = action.payload;
    // },
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred";
        state.loading = false;
      });
  },
});

export default UsersRegSlice.reducer;
// export const { setUser } = UsersRegSlice.actions;

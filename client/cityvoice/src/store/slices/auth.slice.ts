import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Users } from "../../types/userType";

type UserName = {
  firstName: Pick<Users["name"], "firstName">;
};

interface AuthState {
  isLoggedIn: boolean;
  firstName: UserName | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  firstName: null,
};

const UsersAuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserName>) => {
      state.isLoggedIn = true;
      state.firstName = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.firstName = null;
    },
  },
});

export default UsersAuthSlice.reducer;
export const { login, logout } = UsersAuthSlice.actions;

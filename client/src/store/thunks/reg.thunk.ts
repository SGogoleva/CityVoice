import { createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser, registeredUser } from "../../types/userType";
import { attemptRegister } from "../../http/index";

export const registerUserThunk = createAsyncThunk(
  "authentication/registration",
  async (userData: registerUser) => {
    return await attemptRegister(userData);
  }
);

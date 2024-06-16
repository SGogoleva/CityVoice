import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserById } from "../../http";

export const getUserThunk = createAsyncThunk(
  "users/getSingleUser",
  async (id: string) => {
    return await getUserById(id);
  }
);

import { createAsyncThunk } from '@reduxjs/toolkit'
import { loginUser } from "../../types/userType"
import { attemptLogin } from "../../http/index"

export const loginThunk = createAsyncThunk<
  loginUser,
  { email: string, password: string },
  { rejectValue: Error }>(
    'auth/login',
    async ({ email, password }) => {
      return await attemptLogin(email, password)
    })

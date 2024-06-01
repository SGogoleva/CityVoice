import { createAsyncThunk } from '@reduxjs/toolkit'
import { registerUser, registeredUser } from "../../types/userType"
import { attemptRegister } from "../../http/index"

export const registerUserThunk = createAsyncThunk<
  registeredUser,
  registerUser,
  { rejectValue: Error }>(
    'users/reg',
    async (registerUser) => {
      return await attemptRegister(registerUser)
    })

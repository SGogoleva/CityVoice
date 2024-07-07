import { createAsyncThunk } from "@reduxjs/toolkit";
import { loggedUser, loginUser } from "../../types/userType";
import { attemptLogin, isAuth, performLogout } from "../../http/index";
import { CustomError } from "../../types/error";


export const loginThunk = createAsyncThunk<
  loggedUser,
  loginUser,
  { rejectValue: Error }
>("authentication/attemptLogin", async ({ email, password }: loginUser, { rejectWithValue }) => {
  try {
    const response = await attemptLogin({ email, password });
    return response
  } catch (error: unknown) {
    const typedError = error as CustomError;
    if (typedError.response && typedError.response.data && typedError.response.data.message) {
      return rejectWithValue(new Error(typedError.response.data.message));
    } else {
      return rejectWithValue(new Error('An unknown error occurred.'));
    }
  }
   
});

export const checkAuthThunk = createAsyncThunk(
  "authentication/check-token",
  async () => {
    return await isAuth();
  }
);

export const logoutThunk = createAsyncThunk(
  "authentication/logout",
  async () => {
    return await performLogout();
  }
);

// export const loginThunk = createAsyncThunk(
//   'auth/loginUser',
//   async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post('http://localhost:8080/api/v1/auth/login', { email, password });
//       return response.data;
//     } catch (err) {
//       if (axios.isAxiosError(err)) {
//         let errorMessage = 'An unknown error occurred';
//         if (err.response) {
//           errorMessage = err.response.data.message || 'Invalid login credentials';
//         }
//         return rejectWithValue(errorMessage);
//       } else {
//         return rejectWithValue('An unknown error occurred');
//       }
//     }
//   }
// );

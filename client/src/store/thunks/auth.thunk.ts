import { createAsyncThunk } from '@reduxjs/toolkit'
import { loggedUser, loginUser } from "../../types/userType"
import { attemptLogin, isAuth, performLogout } from "../../http/index"
import axios from 'axios';

export const loginThunk = createAsyncThunk
<
  loggedUser,
  loginUser,
  { rejectValue: Error }>
  (
    'authentication/attemptLogin',
    async ({ email, password }: loginUser) => {
        return await attemptLogin({ email, password });
    }
  );

export const checkAuthThunk = createAsyncThunk(
  'authentication/check-token',
  async () => {
    return await isAuth()
  }
)

export const logoutThunk = createAsyncThunk(
  "authentication/logout",
  async () => {
    return await performLogout();
  }
)

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

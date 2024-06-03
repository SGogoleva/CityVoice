import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import regReducer from "./slices/reg.slice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    reg: regReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store
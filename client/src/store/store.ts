import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import regReducer from "./slices/reg.slice"
import projectsReducer from "./slices/project.slice"

const store = configureStore({
  reducer: {
    // auth: authReducer,
    // reg: regReducer,
    projects: projectsReducer
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store
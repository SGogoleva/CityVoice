import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import regReducer from "./slices/reg.slice"
import projectsReducer from "./slices/project.slice"
import singleProjectReducer from "./slices/singleproject.slice"
import voteReducer from "./slices/vote.slice"
import messageReduser from "./slices/message.slice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    reg: regReducer,
    projects: projectsReducer,
    singleProject: singleProjectReducer,
    vote: voteReducer,
    message: messageReduser
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store
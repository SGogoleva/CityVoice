import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import regReducer from "./slices/reg.slice"
import projectsReducer from "./slices/project.slice"
import singleProjectReducer from "./slices/singleproject.slice"
import voteReducer from "./slices/vote.slice"
import messageReduser from "./slices/message.slice"
import checkTokenReduser from "./slices/token.slice"
import last3ProjectsReducer from "./slices/lastProjects.slice"
import userReducer from "./slices/user.slice"


const store = configureStore({
  reducer: {
    auth: authReducer,
    reg: regReducer,
    projects: projectsReducer,
    singleProject: singleProjectReducer,
    vote: voteReducer,
    message: messageReduser,
    isAuth: checkTokenReduser,
    last3Projects: last3ProjectsReducer,
    user: userReducer
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store
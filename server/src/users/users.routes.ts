import { Router } from "express";
import {
  deleteUser,
  getUserById,
  getUsersPaginated,
  updateUserInfo,
  updateUsersAvatar,
} from "./users.controller";
import upload from "../config/multerConfig";
import checkAuth from "../auth/auth.check";
import checkUpdateUserInfoInput from "./users.middleware";
const usersouter: Router = Router();

usersouter
  .get("/", getUsersPaginated)
  .get("/singleUser/:id", getUserById)
  .put("/update-avatar/:id", checkAuth, upload.single("avatar"), updateUsersAvatar)
  .put("/update-userInfo/:id", checkAuth, checkUpdateUserInfoInput, updateUserInfo)
  .delete("/delete-user/:id", checkAuth, deleteUser)

export default usersouter;

import { Router } from "express";
import { getUserById, getUsersPaginated, updateUsersAvatar } from "./users.controller";
import upload from "../config/multerConfig";
const usersouter: Router = Router()

usersouter
    .get("/", getUsersPaginated)
    .get("/singleUser/:id", getUserById)
    .put('/update-avatar/:id', upload.single('avatar'), updateUsersAvatar);

export default usersouter
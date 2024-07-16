import { Router } from "express";
import { getUserById, getUsersPaginated } from "./users.controller";
const usersouter: Router = Router()

usersouter
    .get("/", getUsersPaginated)
    .get("/singleUser/:id", getUserById)

export default usersouter
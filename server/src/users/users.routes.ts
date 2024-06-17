import { Router } from "express";
import { getUserById } from "./users.controller";
const usersouter: Router = Router()

usersouter
    .get("/singleUser/:id", getUserById)

export default usersouter
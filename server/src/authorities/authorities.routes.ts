import { Router } from "express";
import { getAuthorities } from "./authorities.controller";

const authoritiesRouter: Router = Router()

authoritiesRouter.get('/', getAuthorities)

export default authoritiesRouter
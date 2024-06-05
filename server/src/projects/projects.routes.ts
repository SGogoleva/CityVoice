import { Router } from "express";
import { getProjectsPaginated } from "./projects.controller";

const projectsRouter: Router = Router()

projectsRouter.get('/', getProjectsPaginated)

export default projectsRouter
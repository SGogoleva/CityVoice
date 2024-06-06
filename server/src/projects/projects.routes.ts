import { Router } from "express";
import { getProjectById, getProjectVotes, getProjectsPaginated } from "./projects.controller";

const projectsRouter: Router = Router()

projectsRouter
    .get('/', getProjectsPaginated)
    .get('/single/:id', getProjectById)
    .get('/single/:id/results', getProjectVotes)
    

export default projectsRouter
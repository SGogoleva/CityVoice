import { Router } from "express";
import { getProjectById, getProjectVotes, getProjectsPaginated, getProjectByCity, postVoteCounts } from "./projects.controller";
import { authMiddleware } from "../auth/auth.middleware";

const projectsRouter: Router = Router()

projectsRouter
    .get('/', getProjectsPaginated)
    .get('/single/:id', getProjectById)
    .get('/single/:id/results', getProjectVotes)
    .get('/grouped/:cityId', getProjectByCity)
    .post('/project/vote', postVoteCounts)

export default projectsRouter
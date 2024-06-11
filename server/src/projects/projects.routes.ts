import { Router } from "express";
import { getProjectById, getProjectVotes, getProjectsPaginated, getProjectByCity, postVoteCounts } from "./projects.controller";
import checkAuth from "../auth/auth.check";

const projectsRouter: Router = Router()

projectsRouter
    .get('/', getProjectsPaginated)
    .get('/single/:id', getProjectById)
    .get('/single/:id/results', getProjectVotes)
    .get('/grouped/:cityId', getProjectByCity)
    .post('/project/vote',checkAuth, postVoteCounts)

export default projectsRouter
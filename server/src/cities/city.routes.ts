import { Router } from "express";
import { getCities } from "../cities/city.controller";

const citiesRouter: Router = Router()

citiesRouter.get('/', getCities)

export default citiesRouter
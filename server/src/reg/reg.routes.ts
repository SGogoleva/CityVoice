import { Router } from "express";
import { checkRegistrationInput, registerUser } from "./reg.controller";

const regUserRouter: Router = Router();

regUserRouter.post('/register', checkRegistrationInput, registerUser);

export default regUserRouter;
import { Router } from "express";
import { login, checkLoginInput } from './auth.controller';
import { checkRegistrationInput, registerUser } from "../registration/reg.controller";

const authRouter: Router = Router();

authRouter.post('/login', checkLoginInput, login);
authRouter.post('/register', checkRegistrationInput, registerUser);

export default authRouter;
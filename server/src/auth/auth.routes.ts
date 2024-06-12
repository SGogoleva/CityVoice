import { Router } from "express";
import { login, checkLoginInput, checkAuthToken } from './auth.controller';
import { checkRegistrationInput, registerUser } from "../registration/reg.controller";
import { checkSessionToken } from "./auth.check";

const authRouter: Router = Router();

authRouter.post('/login', checkLoginInput, login);
authRouter.post('/register', checkRegistrationInput, registerUser);
authRouter.get('/isAuth', checkSessionToken, checkAuthToken)

export default authRouter;
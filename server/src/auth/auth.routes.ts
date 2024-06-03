import { Router } from "express";
import { login, checkLoginInput } from './auth.controller';

const authRouter: Router = Router();

authRouter.post('/login', checkLoginInput, login);

export default authRouter;
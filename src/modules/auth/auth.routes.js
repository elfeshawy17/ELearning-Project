import { Router } from "express";
import { checkEmail } from './../../middlewares/checkEmails.js';
import authContoller from "./auth.contoller.js";

export const authRouter = Router();

authRouter.post('/register', checkEmail, authContoller.register);

authRouter.post('/login', authContoller.login);

authRouter.post('/changePassword', authContoller.changePassword);
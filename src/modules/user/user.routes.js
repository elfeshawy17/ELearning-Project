import { Router } from "express";
import { checkEmail } from './../../middlewares/checkEmails.js';
import userController from "./user.controller.js";


export const userRouter = Router();

userRouter.route('/')
            .post(checkEmail, userController.addUser)
            .get(userController.getAllUsers)

userRouter.route('/:id')
            .put(userController.updateUser)
            .delete(userController.deleteUser)


import { Router } from "express";
import { checkEmail } from './../../middlewares/checkEmails.js';
import userController from "./user.controller.js";
import { protectRoute } from './../../middlewares/protectRoute.js';
import { allowedTo } from "../../middlewares/allowedTo.js";
import { validate } from './../../middlewares/validate.js';
import { userValidationSchema } from "./user.validate.js";


export const userRouter = Router();

userRouter.use(protectRoute);

userRouter.route('/')
            .post(checkEmail, allowedTo('admin'), validate(userValidationSchema), userController.addUser)
            .get(allowedTo('admin'), userController.getAllUsers)

userRouter.route('/:id')
            .put(allowedTo('admin'), userController.updateUser)
            .delete(allowedTo('admin'), userController.deleteUser)


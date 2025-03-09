import { Router } from "express";
import { protectRoute } from "../../middlewares/protectRoute.js";
import { allowedTo } from "../../middlewares/allowedTo.js";
import submissionController from "./submission.controller.js";


export const submissionRouter = Router();

submissionRouter.use(protectRoute);

submissionRouter.route('/')
                .post(allowedTo('student'), submissionController.addSubmission)
                .get(allowedTo('professor', 'admin'), submissionController.getAllSubmissions)

submissionRouter.route('/:id')
                .get(allowedTo('student', 'professor', 'admin'), submissionController.getSubmission)
                .put(allowedTo('student'), submissionController.updateSubmission)
                .delete(allowedTo('admin'), submissionController.deleteSubmission)
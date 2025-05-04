import { Router } from "express";
import { protectRoute } from "../../middlewares/protectRoute.js";
import { allowedTo } from "../../middlewares/allowedTo.js";
import submissionController from "./submission.controller.js";
import { validateFile } from "../../middlewares/validatePDF.js";
import { upload } from "../../middlewares/upload.js";


export const submissionRouter = Router();

submissionRouter.use(protectRoute);

submissionRouter.route('/')
                .post(allowedTo('student'), upload.single('fileUrl'), validateFile, submissionController.addSubmission)
                .get(allowedTo('professor'), submissionController.getAllSubmissions)

submissionRouter.route('/:id')
                .get(allowedTo('student', 'professor'), submissionController.getSubmission)
                .put(allowedTo('student'), submissionController.updateSubmission)
                .delete(allowedTo('professor'), submissionController.deleteSubmission)
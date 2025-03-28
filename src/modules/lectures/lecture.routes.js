import { Router } from "express";
import { addLecture, deleteLecture, getAllLecture, getSpecificLecture, updateLecture } from "./lecture.controller.js";
import { protectRoute } from "../../middlewares/protectRoute.js";
import { allowedTo } from "../../middlewares/allowedTo.js";
import lectureValidationSchema  from "./lecture.validate.js";
import { createValidator } from "express-joi-validation";
import { upload } from "../../middlewares/upload.js";
import { validateFile } from './../../middlewares/validatePDF.js';

const lectureRouter = Router();
const validator = createValidator(); 

lectureRouter.use(protectRoute, allowedTo('admin', 'professor'));

lectureRouter.post("/", upload.single('fileUrl'), validateFile, validator.body(lectureValidationSchema), addLecture);
lectureRouter.get("/", allowedTo('admin', 'professor', 'student'), getAllLecture);
lectureRouter.get("/:id", allowedTo('admin', 'professor', 'student'), getSpecificLecture);
lectureRouter.put("/:id", updateLecture);
lectureRouter.delete("/:id", deleteLecture);

export default lectureRouter;
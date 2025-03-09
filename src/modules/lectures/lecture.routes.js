import { Router } from "express";
import { addLecture, deleteLecture, getAllLecture, updateLecture } from "./lecture.controller.js";
import lectureValidationSchema  from "./lecture.validate.js";
import { createValidator } from "express-joi-validation";
const lectureRouter =Router()

const validator = createValidator(); 
lectureRouter.post("/",validator.body(lectureValidationSchema),addLecture)
lectureRouter.get("/",getAllLecture)
lectureRouter.put("/:id",updateLecture)
lectureRouter.delete("/:id",deleteLecture)








export default lectureRouter
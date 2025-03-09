import { Router } from "express";
import { addAssignment, deleteAssignment, getAllAssignment, updateAssignment } from "./assignment.controller.js";
import { createValidator } from "express-joi-validation";
import assignmentValidationSchema from "./assignment.validate.js";
const assignmentRouter=Router()
const validator = createValidator(); 

assignmentRouter.post("/", validator.body(assignmentValidationSchema),addAssignment)
assignmentRouter.get("/",getAllAssignment)
assignmentRouter.put("/:id",updateAssignment)
assignmentRouter.delete("/:id",deleteAssignment)






export default assignmentRouter
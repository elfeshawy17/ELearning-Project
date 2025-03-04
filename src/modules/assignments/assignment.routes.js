import { Router } from "express";
import { addAssignment, deleteAssignment, getAllAssignment, updateAssignment } from "./assignment.controller.js";

const assignmentRouter=Router()


assignmentRouter.post("/",addAssignment)
assignmentRouter.get("/",getAllAssignment)
assignmentRouter.put("/:id",updateAssignment)
assignmentRouter.delete("/:id",deleteAssignment)





export default assignmentRouter
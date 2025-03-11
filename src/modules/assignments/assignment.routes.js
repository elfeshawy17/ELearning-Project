import { Router } from "express";
import { addAssignment, deleteAssignment, getAllAssignment, updateAssignment } from "./assignment.controller.js";
import { protectRoute } from "../../middlewares/protectRoute.js";
import { allowedTo } from "../../middlewares/allowedTo.js";
import { createValidator } from "express-joi-validation";
import assignmentValidationSchema from "./assignment.validate.js";
import { validateFile } from "../../middlewares/validatePDF.js";
import { upload } from "../../middlewares/upload.js";

const assignmentRouter = Router();
const validator = createValidator(); 

assignmentRouter.use(protectRoute, allowedTo('admin', 'professor'));

assignmentRouter.post("/", upload.single('fileUrl'), validateFile, validator.body(assignmentValidationSchema), addAssignment);
assignmentRouter.get("/", getAllAssignment);
assignmentRouter.put("/:id", updateAssignment);
assignmentRouter.delete("/:id", deleteAssignment);


export default assignmentRouter;
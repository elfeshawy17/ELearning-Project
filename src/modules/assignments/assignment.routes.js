import { Router } from "express";
import { addAssignment, deleteAssignment, getAllAssignment, updateAssignment } from "./assignment.controller.js";
import { protectRoute } from "../../middlewares/protectRoute.js";
import { allowedTo } from "../../middlewares/allowedTo.js";

const assignmentRouter = Router();

assignmentRouter.use(protectRoute, allowedTo('admin', 'professor'));

assignmentRouter.post("/", addAssignment);
assignmentRouter.get("/", getAllAssignment);
assignmentRouter.put("/:id", updateAssignment);
assignmentRouter.delete("/:id", deleteAssignment);


export default assignmentRouter;
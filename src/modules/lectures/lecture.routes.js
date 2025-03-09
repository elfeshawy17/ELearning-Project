import { Router } from "express";
import { addLecture, deleteLecture, getAllLecture, updateLecture } from "./lecture.controller.js";
import { protectRoute } from "../../middlewares/protectRoute.js";
import { allowedTo } from "../../middlewares/allowedTo.js";
import lectureValidationSchema  from "./lecture.validate.js";
import { createValidator } from "express-joi-validation";

const lectureRouter = Router();
const validator = createValidator(); 

lectureRouter.use(protectRoute, allowedTo('admin', 'professor'));

lectureRouter.post("/", validator.body(lectureValidationSchema), addLecture);
lectureRouter.get("/", getAllLecture);
lectureRouter.put("/:id", updateLecture);
lectureRouter.delete("/:id", deleteLecture);

export default lectureRouter;
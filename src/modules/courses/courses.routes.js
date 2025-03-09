import { Router } from "express";
import { addCourse, deleteCourse, getAllCourses, updateCourse } from "./courses.controller.js";
import { protectRoute } from "../../middlewares/protectRoute.js";
import { allowedTo } from "../../middlewares/allowedTo.js";
import courseValidationSchema from "./courses.validate.js";
import { createValidator } from "express-joi-validation";

const courseRouter = Router();
const validator = createValidator(); 

courseRouter.use(protectRoute, allowedTo('admin', 'professor'));

courseRouter.post("/", validator.body(courseValidationSchema), addCourse);
courseRouter.get("/", getAllCourses);
courseRouter.put("/:id", updateCourse);
courseRouter.delete("/:id", deleteCourse);


export default courseRouter;
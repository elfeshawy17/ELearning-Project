import { Router } from "express";
import { addCourse, deleteCourse, getAllCourses, getProfessorCourses, getSpecificCourse, updateCourse } from "./courses.controller.js";
import { protectRoute } from "../../middlewares/protectRoute.js";
import { allowedTo } from "../../middlewares/allowedTo.js";
import courseValidationSchema from "./courses.validate.js";
import { createValidator } from "express-joi-validation";

const courseRouter = Router();
const validator = createValidator(); 

courseRouter.use(protectRoute);

courseRouter.post("/", allowedTo('admin'), validator.body(courseValidationSchema), addCourse);
courseRouter.get("/", allowedTo('admin'),  getAllCourses);
courseRouter.get("/professor", allowedTo('professor'), getProfessorCourses);
courseRouter.get("/:id", allowedTo('admin'),  getSpecificCourse);
courseRouter.put("/:id", allowedTo('admin'),  updateCourse);
courseRouter.delete("/:id", allowedTo('admin'),  deleteCourse);


export default courseRouter;
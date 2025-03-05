import { Router } from "express";
import { addCourse, deleteCourse, getAllCourses, updateCourse } from "./courses.controller.js";
import { protectRoute } from "../../middlewares/protectRoute.js";
import { allowedTo } from "../../middlewares/allowedTo.js";

const courseRouter = Router();

courseRouter.use(protectRoute, allowedTo('admin', 'professor'));

courseRouter.post("/", addCourse);
courseRouter.get("/", getAllCourses);
courseRouter.put("/:id", updateCourse);
courseRouter.delete("/:id", deleteCourse);



export default courseRouter;
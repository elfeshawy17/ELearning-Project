import { Router } from "express";
import { addCourse, deleteCourse, getAllCourses, updateCourse } from "./courses.controller.js";

const courseRouter =Router()

courseRouter.post("/",addCourse)
courseRouter.get("/",getAllCourses)
courseRouter.put("/:id",updateCourse)
courseRouter.delete("/:id",deleteCourse)



export default courseRouter
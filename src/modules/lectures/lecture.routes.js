import { Router } from "express";
import { addLecture, deleteLecture, getAllLecture, updateLecture } from "./lecture.controller.js";

const lectureRouter =Router()


lectureRouter.post("/",addLecture)
lectureRouter.get("/",getAllLecture)
lectureRouter.put("/:id",updateLecture)
lectureRouter.delete("/:id",deleteLecture)








export default lectureRouter
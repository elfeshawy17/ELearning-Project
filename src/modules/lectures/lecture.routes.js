import { Router } from "express";
import { addLecture, deleteLecture, getAllLecture, updateLecture } from "./lecture.controller.js";
import { protectRoute } from "../../middlewares/protectRoute.js";
import { allowedTo } from "../../middlewares/allowedTo.js";

const lectureRouter = Router();

lectureRouter.use(protectRoute, allowedTo('admin', 'professor'));

lectureRouter.post("/", addLecture);
lectureRouter.get("/", getAllLecture);
lectureRouter.put("/:id", updateLecture);
lectureRouter.delete("/:id", deleteLecture);


export default lectureRouter;
import { Router } from "express";
import { postcontroller } from "./post.controller";
import { auth } from "../../middleware/auth";
import { User_Role } from "../../constant/userRole";
// import { User_Role } from "../../constant/userRole";

const router = Router();

router.post("/create-post", auth("USER", "ADMIN"), postcontroller.createPost);
router.get("/all-post", postcontroller.getAllPost);
router.get("/my-post",auth("USER","ADMIN") ,postcontroller.getMyAllPost);
router.delete("/delete-post/:id",auth("USER","ADMIN") ,postcontroller.deletePost);

export const postRouter = router;
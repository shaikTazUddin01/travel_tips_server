import { Router } from "express";
import { postcontroller } from "./post.controller";
import { auth } from "../../middleware/auth";
import { User_Role } from "../../constant/userRole";
import { multerUpload } from "../../config/multer.config";
// import { User_Role } from "../../constant/userRole";

const router = Router();

router.post("/create-post",multerUpload.single('image'), auth("USER", "ADMIN"), postcontroller.createPost);
router.get("/all-post", postcontroller.getAllPost);
router.get("/my-post",auth("USER","ADMIN") ,postcontroller.getMyAllPost);
router.get("/getSpecificUserPost/:id",auth("USER","ADMIN") ,postcontroller.getSpecificUserPost);
router.delete("/delete-post/:id",auth("USER","ADMIN") ,postcontroller.deletePost);
router.delete("/delete-post-byAdmin/:id",auth("ADMIN") ,postcontroller.deletePostByAdmin);
router.post("/upvoteDownvote",auth("USER","ADMIN") ,postcontroller.upvoteToUser);
router.patch("/updatePost/:id",auth("USER","ADMIN") ,postcontroller.updatePost);
router.patch("/updatePostByAdmin/:id",auth("ADMIN") ,postcontroller.updatePostByAdmin);
router.post("/comment",auth("USER","ADMIN") ,postcontroller.commentToPost);
router.delete("/comment",auth("USER","ADMIN") ,postcontroller.deleteComment);
router.patch("/comment",auth("USER","ADMIN") ,postcontroller.updateComment);
router.get("/getSinglePost/:id",auth("USER","ADMIN") ,postcontroller.getSinglePost);
router.get("/all-post-byAdmin",auth("ADMIN") ,postcontroller.getPostByAdmin);

export const postRouter = router;

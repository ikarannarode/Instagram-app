// import express from "express";
// import upload from "../middlewares/multer.js";
// import { addComment, addNewPost, bookMarkPost, deletePost, dislikePost, getAllPost, getCommentsOfPost, getUserPost, likePost } from "../controllers/post.controller.js";
// import isAuthenticated from "../middlewares/isAuthenticated.js";

// const router = express.Router();

// router.route("/addpost").post(isAuthenticated, upload.single('image'), addNewPost);
// router.route("/all").get(isAuthenticated, getAllPost);
// router.route("/userpost/all").get(isAuthenticated, getUserPost);
// router.route("/:id/like").get(isAuthenticated, likePost);
// router.route("/:id/dislike").get(isAuthenticated, dislikePost);
// router.route("/:id/comment").post(isAuthenticated, addComment);
// router.route("/:id/comment/all").post(isAuthenticated, getCommentsOfPost);
// router.route("/delete/:id").post(isAuthenticated, deletePost);
// router.route("/:id/bookmark").post(isAuthenticated, bookMarkPost);



// export default router;






import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";
import { addComment, addNewPost, bookMarkPost, deletePost, dislikePost, getAllPost, getCommentsOfPost, getUserPost, likePost } from "../controllers/post.controller.js";

const router = express.Router();

router.route("/addpost").post(isAuthenticated, upload.single('image'), addNewPost);
router.route("/all").get(isAuthenticated, getAllPost);
router.route("/userpost/all").get(isAuthenticated, getUserPost);
router.route("/:id/like").get(isAuthenticated, likePost);
router.route("/:id/dislike").get(isAuthenticated, dislikePost);
router.route("/:id/comment").post(isAuthenticated, addComment);
router.route("/:id/comment/all").post(isAuthenticated, getCommentsOfPost);
router.route("/delete/:id").delete(isAuthenticated, deletePost);
router.route("/:id/bookmark").get(isAuthenticated, bookMarkPost);

export default router;


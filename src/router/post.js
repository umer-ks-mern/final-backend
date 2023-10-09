import { Router } from "express";
import postController from "../controller/post.js";
import commentController from "../controller/comments.js";
import likeController from "../controller/likes.js";
import loginAuth from "../middleware/loginAuthorization.js";
import roleAuth from "../middleware/roleAuthorization.js";
import postValidator from "../validator/validatePost.js";
import upload from "../middleware/multer.js";


const postRouter = new Router();
postRouter.get("/posts", loginAuth, roleAuth, postController.getAll);
postRouter.get("/post/:id", postController.getSingle);
postRouter.get("/post-delete/:id", postController.delete);
postRouter.put("/post/:id", postController.update);
postRouter.post(
  "/post",
  upload.single('file'),
  postValidator.create,
  postController.create
);

postRouter.get("/comments/:id", commentController.getAll);

postRouter.post("/comment/:id", commentController.add);
postRouter.post(
  "/comment/reply/:post_id/:comment_id",
  commentController.addReply
);
postRouter.get("/comment/:post_id/:comment_id", commentController.getSingle);

postRouter.post("/likes/:id", likeController.updateLikes);
postRouter.get("/user-posts/:user_id", postController.userPosts);
postRouter.get("/recent-posts/", postController.recentPosts);
postRouter.get("/email-posts/:email", postController.emailPosts);
postRouter.get("/email-posts/:userId", postController.followingPosts);

export default postRouter;

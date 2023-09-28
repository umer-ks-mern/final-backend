import { Router } from "express";
import userController from "../controller/user.js";
import signInController from "../controller/auth.js";

const userRouter = new Router();

userRouter.get("/users", userController.getAll);
userRouter.get("/users/:search", userController.searchAll);
userRouter.get("/user/:id", userController.getSingle);
userRouter.get("/user_delete/:id", userController.delete);

userRouter.post("/signin", signInController.signIn);
userRouter.post("/signup", userController.signUp);

userRouter.put("/user/:id", userController.update);
userRouter.put("/user/bio/:id", userController.addBio);
userRouter.put(
  "/user/followers/:user_id/:follower_id",
  userController.updateFollowers
);
userRouter.put(
  "/user/followings/:user_id/:following_id",
  userController.updateFollowings
);

export default userRouter;

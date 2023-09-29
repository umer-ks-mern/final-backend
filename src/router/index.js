import { Router } from "express";
import userRouter from "./user.js";
import postRouter from "./post.js";
import otpRouter from "./otp.js";
import chatRouter from "./chat.js";

const mainRouter = new Router();

mainRouter.use(userRouter);
mainRouter.use(postRouter);
mainRouter.use(otpRouter);
mainRouter.use(chatRouter)

export default mainRouter;

import { Router } from "express";
import userRouter from "./user.js";
import postRouter from "./post.js";
import otpRouter from "./otp.js";
import notificationRouter from "./notification.js";

const mainRouter = new Router();

mainRouter.use(userRouter);
mainRouter.use(postRouter);
mainRouter.use(otpRouter);
mainRouter.use(notificationRouter);
export default mainRouter;

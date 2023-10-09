import { Router } from "express";
import otpController from "../controller/otp.js";
import newPasswordController from "../email/auth/ForgetPassword.js";

const otpRouter = new Router();

otpRouter.post("/otp", otpController.verify);
otpRouter.get("/otp/:email", otpController.generate);
otpRouter.post("/resetpass",newPasswordController.setPassword);


export default otpRouter;

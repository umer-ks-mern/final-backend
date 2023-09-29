import { Router } from "express";
import chatController from "../controller/Chat.controller.js";

const chatRouter = new Router();

chatRouter.post("/sendMessage", chatController.sendMessage);


export default chatRouter;

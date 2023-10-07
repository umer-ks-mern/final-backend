import { Router } from "express";
import notificationController from "../controller/notification.js";

const notificationRouter = new Router();

notificationRouter.post('/', notificationController.createNotification);

notificationRouter.get('/:userId', notificationController.getNotification);

notificationRouter.put('/:notificationId', notificationController.markNotificationAsRead);

notificationRouter.delete('/:notificationId', notificationController.deleteNotification);

export default notificationRouter;

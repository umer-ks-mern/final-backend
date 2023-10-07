import NotificationModel from "../model/notifications.js";

const notificationController = {
  createNotification: async (recipientId, senderId, type, content) => {
    const notification = new NotificationModel({
      recipient_id: recipientId,
      sender_id: senderId,
      type: type,
      content: content,
      is_read: false, // Assuming notifications are initially unread
    });

    await notification.save();
    return notification;
  },

  getNotification: async (user_id) => {
    const notifications = await NotificationModel.find({
      recipient_id: user_id
    }).exec();
    return notifications;
  },

  markNotificationAsRead: async (notification_id) => {
    await NotificationModel.findByIdAndUpdate(notification_id, {
      is_read: true
    }).exec();
  },

  deleteNotification: async (notification_id) => {
    await NotificationModel.findByIdAndDelete(notification_id).exec();
  }
};

export default notificationController;

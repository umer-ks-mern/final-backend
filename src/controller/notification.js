import Notification from "../model/notifications";

async function createNotification(recipientId, senderId, type, content) {
    const notification = new Notification({
      recipient_id: recipientId,
      sender_id: senderId,
      type: type,
      content: content,
      is_read: false, // Assuming notifications are initially unread
    });
  
    await notification.save();
    return notification;
  }

async function getNotification(user_id) {
    const notifications = await Notification.find({
        recipient_id: user_id
    }).exec();
    return notifications;
}

async function markNotificationAsRead(notification_id) {
    await Notification.findByIdAndUpdate(notification_id, {
        is_read: true
    }).exec();
}

// Function to delete a notification

async function deleteNotification(notification_id) {
    await Notification.findByIdAndDelete(notification_id).exec();

}

export default {
    createNotification,
    getNotification,
    markNotificationAsRead,
    deleteNotification
};
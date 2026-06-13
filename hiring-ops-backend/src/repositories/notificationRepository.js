const Notification =
  require("../models/Notification");

const createNotification = (data) => {
  return Notification.create(data);
};

const getUserNotifications = (recipientId) => {
  return Notification.find({
    recipientId,
  }).sort({
    createdAt: -1,
  });
};

const markAsRead = (notificationId) => {
  return Notification.findByIdAndUpdate(
    notificationId,
    {
      isRead: true,
    },
    {
      new: true,
    }
  );
};

module.exports = {

  createNotification,

  getUserNotifications,

  markAsRead,
};

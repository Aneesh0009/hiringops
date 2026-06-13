const notificationRepository =
  require(
    "../repositories/notificationRepository"
  );

const getNotifications = async (req, res) => {
  const notifications = await notificationRepository.getUserNotifications(
    req.user._id
  );
  res.json(notifications);
};

const readNotification = async (req, res) => {
  const notification = await notificationRepository.markAsRead(req.params.id);
  res.json(notification);
};

module.exports = {
  getNotifications,
  readNotification,
};

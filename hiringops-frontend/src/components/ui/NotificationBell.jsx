import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchNotifications,
  markNotificationRead,
} from "../../features/notifications/notificationSlice";

const NotificationBell = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const {
    notifications,

    unreadCount,
  } = useSelector((state) => state.notifications);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleRead = async (id) => {
    await dispatch(markNotificationRead(id));
  };

  return (
    <div className="relative">
      {/* BELL BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="
          relative
          text-2xl
        "
      >
        🔔
        {unreadCount > 0 && (
          <span
            className="
                absolute
                -top-2
                -right-2
                bg-red-500
                text-white
                text-xs
                rounded-full
                px-2 py-1
              "
          >
            {unreadCount}
          </span>
        )}
      </button>

      {/* DROPDOWN */}
      {open && (
        <div
          className="
              absolute
              right-0
              mt-4
              w-[350px]
              bg-white
              shadow-xl
              rounded-xl
              border
              z-50
              max-h-[500px]
              overflow-y-auto
            "
        >
          <div className="p-4 border-b">
            <h2 className="font-bold text-lg">Notifications</h2>
          </div>

          {notifications.length === 0 && (
            <div className="p-4 text-gray-500">No notifications</div>
          )}

          {notifications.map((notification) => (
            <div
              key={notification._id}
              onClick={() => handleRead(notification._id)}
              className={`
                      p-4
                      border-b
                      cursor-pointer
                      hover:bg-gray-50

                      ${!notification.isRead ? "bg-blue-50" : ""}
                    `}
            >
              <h3 className="font-semibold">{notification.title}</h3>

              <p className="text-sm text-gray-600 mt-1">
                {notification.message}
              </p>

              <p className="text-xs text-gray-400 mt-2">
                {new Date(notification.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;

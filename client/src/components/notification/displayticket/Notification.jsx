import { deleteNotification, fetchNotifications } from "@/services/notification/notif.service";
import React, { useState, useEffect } from "react";
import { IoPersonCircleSharp, IoClose, IoTrashBin } from "react-icons/io5";
import { Toaster, toast } from "sonner";

const DisplayFetchedData = ({ setNotificationCount }) => {
  const [notifications, setNotifications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const fetchedNotifications = await fetchNotifications();
        setNotifications(fetchedNotifications);
        setNotificationCount(fetchedNotifications.length);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    getNotifications();
    const interval = setInterval(() => {
      getNotifications();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleDeleteNotification = async (id) => {
    toast.promise(
      (async () => {
        await deleteNotification(id);
        setNotifications(notifications.filter((notification) => notification.id !== id));
        setShowModal(false);
        setShowConfirmModal(false);
      })(),
      {
        loading: "Deleting notification...",
        success: "Notification deleted successfully",
        error: (err) => `Failed to delete notification: ${err.message}`,
      }
    );
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  return (
    <div>
      <Toaster richColors />
      {showModal && selectedNotification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 md:p-8 rounded-lg shadow-lg relative max-w-full md:max-w-lg w-full">
            <IoClose
              className="absolute top-2 right-2 md:top-4 md:right-4 text-xl md:text-2xl cursor-pointer text-gray-500 hover:text-gray-700"
              onClick={() => setShowModal(false)}
            />
            <div className="flex flex-col items-center space-y-2 md:space-y-4">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                {selectedNotification.userId}
              </h1>
              <p className="text-base md:text-lg text-gray-700 text-center">
                {selectedNotification.message}
              </p>
              <p className="text-xs md:text-sm text-gray-500">
                {formatDate(selectedNotification.timestamp)}
              </p>
              <button
                className="flex items-center justify-center space-x-2 text-xs md:text-sm mt-2 md:mt-4 px-4 md:px-6 py-2 md:py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
                onClick={() => setShowConfirmModal(true)}
              >
                <IoTrashBin className="text-base md:text-lg" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg relative max-w-full w-full md:p-8 md:max-w-lg">
            <h2 className="text-xl font-bold text-gray-900 md:text-2xl">Confirm Deletion</h2>
            <p className="text-base text-gray-700 text-center md:text-lg">
              Are you sure you want to delete this notification?
            </p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                onClick={() => handleDeleteNotification(selectedNotification.id)}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="fixed top-16 right-4 z-50 w-full p-4 bg-white shadow-lg rounded-lg dark:bg-gray-800 md:w-80 md:right-4 md:top-16">
        <div className="mb-4">
          <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Notifications</h1>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <div
                key={index}
                className="flex items-center p-4 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                onClick={() => {
                  setShowModal(true);
                  setSelectedNotification(notification);
                }}
              >
                <div className="flex-shrink-0">
                  <IoPersonCircleSharp className="text-3xl text-gray-500 dark:text-gray-400" />
                </div>
                <div className="ml-3 w-0 flex-1">
                  <h2 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {notification.userId}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {notification.message.length > 20
                      ? `${notification.message.substring(0, 20)}...`
                      : notification.message}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">{notification.date}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-sm text-gray-500 dark:text-gray-400">No notifications.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayFetchedData;

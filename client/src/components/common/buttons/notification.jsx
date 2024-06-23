import DisplayFetchedData from "@/components/notification/displayticket/Notification";
import React, { useState, useEffect } from "react";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { fetchNotifications } from "@/services/notification/notif.service";

function Notification({ hasNotification }) {
  const [showForm, setShowForm] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const fetchedNotifications = await fetchNotifications();
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

  return (
    <div className="relative">
      <div
        className="flex flex-col h-10 w-10 items-center justify-center text-gray-500 hover:text-blue-500 transition-all duration-150 cursor-pointer"
        onClick={() => setShowForm(!showForm)}
      >
        <HiOutlineBellAlert size={23} />
        {!hasNotification && (
          <div className="absolute top-[4px] right-[5px] bg-red-500 rounded-full h-[7px] w-[7px]"></div>
        )}
        {notificationCount > 0 && (
          <div className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
            {notificationCount}
          </div>
        )}
      </div>
      {showForm && <DisplayFetchedData setNotificationCount={setNotificationCount} />}
    </div>
  );
}

export default Notification;

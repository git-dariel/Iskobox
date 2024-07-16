import DisplayFetchedData from "@/components/notification/displayticket/Notification";
import React, { useState, useEffect } from "react";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { fetchNotifications } from "@/services/notification/notif.service";

function Notification({ hasNotification }) {
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const getNotifications = async () => {
      try {
        await fetchNotifications();
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

  const handleOpenForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="relative">
      <div
        className="flex flex-col h-10 w-10 items-center justify-center text-gray-500 hover:text-blue-500 transition-all duration-150 cursor-pointer"
        onClick={handleOpenForm}
      >
        <HiOutlineBellAlert size={23} />
        {!hasNotification && (
          <div className="absolute top-[4px] right-[5px] bg-red-500 rounded-full h-[7px] w-[7px]"></div>
        )}
      </div>
      {showForm && <DisplayFetchedData />}
    </div>
  );
}

export default Notification;

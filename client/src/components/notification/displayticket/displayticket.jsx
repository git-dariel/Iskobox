import { fetchNotifications } from "@/services/notification/notif.service";
import React, { useState, useEffect } from "react";
import { IoPersonCircleSharp } from "react-icons/io5";

const DisplayFetchedData = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const getTicket = async () => {
      try {
        const fetchedNotifications = await fetchNotifications();
        setNotifications(fetchedNotifications);
        console.log(
          "Notifications fetched successfully:",
          fetchedNotifications
        );
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    getTicket();
  }, []);

  return (
    <div className=" select-none z-20 absolute top-full right-0 mt-2 border p-5 flex flex-col gap-2 bg-white divide-y divide-gray-100 rounded-lg shadow ark:bg-gray-700 dark:divide-gray-600 w-72 h-80 ">
      <div>
        <h1 className="text-m font-bold text-gray-900">Notifications:</h1>
      </div>
      <span className="border-2"></span>
      <div className="flex gap-2 flex-col w overflow-y-scroll max-h-56 ">
        {notifications &&
          notifications.map((notification, index) => (
            <div
              key={index}
              className="border rounded flex flex-row items-center  "
            >
              <div className="border-1 h-10 w-10 flex items-center justify-center m-2 rounded-full">
                <IoPersonCircleSharp className="text-3xl " />
              </div>
              <div className="pr-4 py-3 text-sm text-gray-900 dark:text-white">
                <h2 className="text-m text-gray-800 truncate font-medium">
                  {notification && notification.title}{" "}
                </h2>
                <p className="text-s truncate ">
                  {notification && notification.description}{" "}
                </p>
                <p>
                  {notification && notification.date}{""}
                </p>
                
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DisplayFetchedData;

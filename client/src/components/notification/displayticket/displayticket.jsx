import { fetchNotifications } from "@/services/notification/notif.service";
import React, { useState, useEffect } from "react";
import { IoPersonCircleSharp } from "react-icons/io5";

const DisplayFetchedData = () => {
  const [notifications, setNotifications] = useState([]);
  const [showModal, setShowModal] = useState(false);
const [selectedNotification, setSelectedNotification] = useState(null);

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
    <div>
      {showModal && selectedNotification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h1>{selectedNotification.title}</h1>
            <p>{selectedNotification.description}</p>
            <p>{selectedNotification.date}</p>
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
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
                className="border rounded flex flex-row items-center cursor-pointer"
                onClick={() => {
                  setShowModal(true);
                  setSelectedNotification(notification);
                }}
              >
                <div className="border-1 h-10 w-10 flex items-center justify-center m-2 rounded-full">
                  <IoPersonCircleSharp className="text-3xl" />
                </div>
                <div className="pr-4 py-3 text-sm text-gray-900 dark:text-white">
                  <h2 className="text-m text-gray-800 truncate font-medium">
                    {notification && notification.title}
                    {""}
                  </h2>
                  <p className="text-s truncate">
                    {notification && notification.description.length > 20
                      ? `${notification.description.substring(0, 20)}...`
                      : notification.description}
                  </p>
                  <p>
                    {notification && notification.date}
                    {""}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );}

export default DisplayFetchedData;

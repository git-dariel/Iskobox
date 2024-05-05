import { fetchNotifications } from "@/services/notification/notif.service";
import React, { useState, useEffect } from "react";
// import mockedata from "./mockdata"; // Import mocked data
import { IoPersonCircleSharp } from "react-icons/io5";

const DisplayFetchedData = () => {
  const [notifications, setNotifications] = useState([]);

  // useEffect(() => {
  //   console.log("Mocked data:", mockedata); // Check what mockedata contains
  //   if (mockedata && mockedata.notificationData) {
  //     setNotifications(mockedata.notificationData);
  //     console.log(
  //       "Notifications set from mocked data:",
  //       mockedata.notificationData
  //     );
  //   } else {
  //     console.error("notificationData is undefined or not an array");
  //   }
  // }, []);

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
    <div className="border-2 p-5 flex flex-col gap-2 w-2/3">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Notifications:</h1>
      </div>
      <span className="border"></span>
      <div className=" flex gap-2 flex-col w">
        {notifications &&
          notifications.map((notification, index) => (
            <div
              key={index}
              className="border  flex flex-row items-center shadow "
            >
              <div className="border-2 h-10 w-10 flex items-center justify-center m-2 rounded-full">
                <IoPersonCircleSharp className="text-3xl " />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {notification && notification.title}{" "}
                </h2>
                <p>
                  {notification && notification.description}{" "}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DisplayFetchedData;

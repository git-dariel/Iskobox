import React, { useState, useEffect } from 'react';
import { fetchNotifications } from '@/services/notification/notif.service';

const DisplayFetchedData = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const getTicket = async () => {
      const fetchedNotifications = await fetchNotifications();
      setNotifications(fetchedNotifications);
      console.log('Notifications fetched successfully:', fetchedNotifications);
    };

    getTicket();
  }, []);

  return (
    <div>
    <h2>Notification: </h2>
      {notifications && notifications.map((notification, index) => (
        <div key={index}>
          <h2>{notification.title}</h2>
          <p>{notification.description}</p>
        </div>
      ))}
    </div>
  );
};

export default DisplayFetchedData;
import { fetchNotifications } from '@/services/notification/notif.service';
import React, { useState, useEffect } from 'react';
import { IoPersonCircleSharp } from 'react-icons/io5';

const DisplayFetchedData = () => {
  const [notifications, setNotifications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const fetchedNotifications = await fetchNotifications();
        setNotifications(fetchedNotifications);
        console.log('Notifications fetched successfully:', fetchedNotifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    getNotifications();

    // Set up an interval to refresh notifications every 30 seconds
    const interval = setInterval(() => {
      getNotifications();
    }, 30000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {showModal && selectedNotification && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-6 rounded-lg shadow-lg'>
            <h1>{selectedNotification.userId}</h1>
            <p>{selectedNotification.message}</p>
            <p>{selectedNotification.timestamp}</p>
            <button
              className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div className='select-none z-20 absolute top-full right-0 mt-2 border p-5 flex flex-col gap-2 bg-white divide-y divide-gray-100 rounded-lg shadow ark:bg-gray-700 dark:divide-gray-600 w-72 h-80'>
        <div>
          <h1 className='text-m font-bold text-gray-900'>Notifications:</h1>
        </div>
        <span className='border-2'></span>
        <div
          className='flex gap-2 flex-col overflow-y-scroll max-h-56'
          style={{ scrollbarWidth: 'none' }}
        >
          {notifications &&
            notifications.map((notification, index) => (
              <div
                key={index}
                className='border rounded flex flex-row items-center cursor-pointer'
                onClick={() => {
                  setShowModal(true);
                  setSelectedNotification(notification);
                }}
              >
                <div className='border-1 h-10 w-10 flex items-center justify-center m-2 rounded-full'>
                  <IoPersonCircleSharp className='text-3xl' />
                </div>
                <div className='pr-4 py-3 text-sm text-gray-900 dark:text-white'>
                  <h2 className='text-m text-gray-800 truncate font-medium'>
                    {notification.userId}
                  </h2>
                  <p className='text-s truncate'>
                    {notification.message.length > 20
                      ? `${notification.message.substring(0, 20)}...`
                      : notification.message}
                  </p>
                  <p>{notification.date}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DisplayFetchedData;

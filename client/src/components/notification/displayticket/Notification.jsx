import { deleteNotification, fetchNotifications } from '@/services/notification/notif.service';
import React, { useState, useEffect } from 'react';
import { IoPersonCircleSharp, IoClose, IoTrashBin } from 'react-icons/io5';

const DisplayFetchedData = () => {
  const [notifications, setNotifications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const fetchedNotifications = await fetchNotifications();
        setNotifications(fetchedNotifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    getNotifications();
    const interval = setInterval(() => {
      getNotifications();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleDeleteNotification = async (id) => {
    try {
      await deleteNotification(id);
      setNotifications(notifications.filter((notification) => notification.id !== id));
      setShowModal(false);
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  return (
    <div>
      {showModal && selectedNotification && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-6 rounded-lg shadow-lg relative'>
            <IoClose
              className='absolute top-2 right-2 text-xl cursor-pointer'
              onClick={() => setShowModal(false)}
            />
            <h1>{selectedNotification.userId}</h1>
            <p>{selectedNotification.message}</p>
            <p>{selectedNotification.timestamp}</p>
            <IoTrashBin
              className='mt-4 text-red-500 cursor-pointer'
              onClick={() => handleDeleteNotification(selectedNotification.id)}
            />
          </div>
        </div>
      )}
      <div className='select-none z-20 absolute top-full right-0 mt-2 border p-5 flex flex-col gap-2 bg-white divide-y divide-gray-100 rounded-lg shadow ark:bg-gray-700 dark:divide-gray-600 w-72 h-96'>
        <div>
          <h1 className='text-m font-bold text-gray-900'>Notifications:</h1>
        </div>
        <span className='border-2'></span>
        <div
          className='flex gap-2 flex-col overflow-y-scroll max-h-56'
          style={{ scrollbarWidth: 'none' }}
        >
          {notifications.length > 0 ? (
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
            ))
          ) : (
            <div className='text-center py-10'>
              <p>No notifications.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayFetchedData;

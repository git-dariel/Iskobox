// NotificationBellForm.js

import React, { useState, useEffect } from 'react';

const NotificationBellForm = () => {
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleNotificationChange = (e) => {
    setNotificationMessage(e.target.value);
  };

  const handleNotificationSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission, e.g., send notification message to server
    console.log('Notification submitted:', notificationMessage);
    setNotificationMessage(''); // Clear the input field after submission
  };

  return (
    <div className="relative">
      <form onSubmit={handleNotificationSubmit}>
        <input
          type="text"
          value={notificationMessage}
          onChange={handleNotificationChange}
          placeholder="Enter notification message"
        />
        <button type="submit">Send Notification</button>
      </form>
    </div>
  );
};

export default NotificationBellForm;
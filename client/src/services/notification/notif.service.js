import { createFirestoreFunctionsForCollection } from '../template.service';

// Create Notification Collection
const notificationOperations = createFirestoreFunctionsForCollection('notifications');

// Fetch Notifications
export const fetchNotifications = async () => {
  const notifications = await notificationOperations.fetchDocuments();
  console.log(notifications);
  return notifications; // Add this line to return the fetched notifications
};

// Add Notification
export const addNewNotification = async (newNotificationData) => {
  const newNotification = await notificationOperations.addDocument(newNotificationData);
  console.log(newNotification);
};

// Update Notification
export const updateNotification = async (notificationId, newValue) => {
  const updatedNotification = await notificationOperations.updateDocument(notificationId, newValue);
  console.log(updatedNotification);
};

// Delete Notification
export const deleteNotification = async (notificationId) => {
  await notificationOperations.deleteDocument(notificationId);
};

import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../database/firebase-connection';

// Create a new notification
export const addNewNotification = async (notificationData) => {
  try {
    const docRef = await addDoc(collection(db, 'notifications'), notificationData);
    return { id: docRef.id, ...notificationData };
  } catch (error) {
    console.error('Error adding notification:', error);
    throw error;
  }
};

// Fetch all notifications
export const fetchNotifications = async () => {
  const notifications = await notificationOperations.fetchDocuments();
  console.log(notifications);
  return notifications; // Add this line to return the fetched notifications
};

// Delete a notification
export const deleteNotification = async (notificationId) => {
  try {
    await deleteDoc(doc(db, 'notifications', notificationId));
  } catch (error) {
    console.error('Error deleting notification:', error);
    throw error;
  }
};

// Update a notification
export const updateNotification = async (notificationId, updateData) => {
  try {
    const notificationRef = doc(db, 'notifications', notificationId);
    await updateDoc(notificationRef, updateData);
  } catch (error) {
    console.error('Error updating notification:', error);
    throw error;
  }
};

// Fetch a single notification details
export const fetchNotificationDetails = async (notificationId) => {
  try {
    const notificationDocRef = doc(db, 'notifications', notificationId);
    const notificationDoc = await getDoc(notificationDocRef);
    if (notificationDoc.exists()) {
      return { id: notificationDoc.id, ...notificationDoc.data() };
    } else {
      console.log('No such notification!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching notification details:', error);
    throw error;
  }
};

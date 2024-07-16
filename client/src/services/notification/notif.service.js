import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../database/firebase-connection";

// Create a new notification
export const addNewNotification = async (notificationData, userEmail) => {
  try {
    const docRef = await addDoc(collection(db, "notifications"), notificationData);
    console.log("Notification added with ID:", docRef.id);

    // Add a document to the 'mail' collection to trigger the email
    const mailDocRef = await addDoc(collection(db, "mail"), {
      to: userEmail,
      message: {
        subject: "New PUP Accreditations Notification",
        text: `You have a new notification: ${notificationData.message}`,
        html: `<p>You have a new notification: ${notificationData.message}</p><p>Open this link to redirect to our site: <a href="https://pup-adms.vercel.app/">https://pup-adms.vercel.app/</a></p>`,
      },
    });
    console.log("Mail document added with ID:", mailDocRef.id);

    return { id: docRef.id, ...notificationData };
  } catch (error) {
    console.error("Error adding notification or sending email:", error);
    throw error;
  }
};

// Fetch all notifications
export const fetchNotifications = async () => {
  try {
    const notificationsSnapshot = await getDocs(collection(db, "notifications"));
    return notificationsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};

// Delete a notification
export const deleteNotification = async (notificationId) => {
  try {
    await deleteDoc(doc(db, "notifications", notificationId));
  } catch (error) {
    console.error("Error deleting notification:", error);
    throw error;
  }
};

// Update a notification
export const updateNotification = async (notificationId, updateData) => {
  try {
    const notificationRef = doc(db, "notifications", notificationId);
    await updateDoc(notificationRef, updateData);
  } catch (error) {
    console.error("Error updating notification:", error);
    throw error;
  }
};

// Fetch a single notification details
export const fetchNotificationDetails = async (notificationId) => {
  try {
    const notificationDocRef = doc(db, "notifications", notificationId);
    const notificationDoc = await getDoc(notificationDocRef);
    if (notificationDoc.exists()) {
      return { id: notificationDoc.id, ...notificationDoc.data() };
    } else {
      console.log("No such notification!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching notification details:", error);
    throw error;
  }
};

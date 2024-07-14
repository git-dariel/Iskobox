import { addDoc, collection, serverTimestamp, doc, getDoc } from "firebase/firestore";
import { db } from "../database/firebase-connection";
import { getAuth } from "firebase/auth";

// Middleware to log user activity
export const logActivity = async (action, details) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw new Error("User not logged in");
    }

    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      throw new Error("User not found in the database");
    }

    const userData = userDoc.data();
    const activityLog = {
      userId: user.uid,
      email: user.email,
      firstname: userData.firstname,
      lastname: userData.lastname,
      action,
      details,
      timestamp: serverTimestamp(),
    };

    await addDoc(collection(db, "activityLogs"), activityLog);
    console.log("Activity logged:", activityLog);
  } catch (error) {
    console.error("Error logging activity:", error);
  }
};
